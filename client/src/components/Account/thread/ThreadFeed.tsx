import { Socket, io } from "socket.io-client";
import ChatStore from "../../../store";
import { Message } from "../../../../../server/src/types/Message";
import { useEffect, useState } from "react";
import ThreadMessage from "./ThreadMessage";
import { trpc } from "../../../utils/trpc";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ThreeDots } from "react-loading-icons";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsFillChatSquareTextFill, BsInfoCircleFill } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";

const ThreadFeed = () => {
    const currentThread = ChatStore(state => state.currentThread);
    const currentUser = ChatStore(state => state.currentUser);
    const addMessage = ChatStore(state => state.actions.addMessage);
    const currentMessages = ChatStore(state => state.messages);
    const setMessages = ChatStore(state => state.actions.setMessages);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [currentTyper, setCurrentTyper] = useState<string | null>(null);

    trpc.thread.getThreadMessages.useQuery({ roomId: currentThread?.roomId ?? null}, { 
        enabled: true, 
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: true,
        onSuccess: (data: Message[]) => {
            console.log("MESSAGES SET")
            setMessages(data);
        },
        onError: (error) => {
            setMessages([]);
            console.log(error)
        }
    });

    const useAddMessage = trpc.thread.addMessage.useMutation();

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        setSocket(newSocket);

        return () => {
            // Clean up the socket connection when the component unmounts
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                socket.emit('joinRoom', currentThread?.roomId);
            });
            socket.on('receiveMessage', (message: Message) => {
                addMessage(message);
                // Handle the received message as needed
            });
            socket.on('typing', (typer: string) => {
                setCurrentTyper(typer);
            });
        }
    }, [addMessage, currentThread?.roomId, setCurrentTyper, socket]);


    const sendMessage = async (message: Message) => {
        await useAddMessage.mutateAsync({ message }, {
            onSuccess: (data) => {
                socket?.emit('sendMessage', { room: currentThread?.roomId, message });
                addMessage(data);
                setMessage('');
                socket?.emit('setTyper', { room: currentThread?.roomId, typer: null });
            },
        });
    };

    const handleMessageDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setMessage(value);
        const textarea = event.target;
        textarea.style.height = "38px"; // Set the minimum height
        // Calculate the required height based on the content
        const scrollHeight = textarea.scrollHeight;
        const clientHeight = textarea.clientHeight;
        const height = Math.max(scrollHeight, clientHeight);
        textarea.style.height = (height > 38) ? height + "px" : "38px";
        textarea.scrollTop = scrollHeight - clientHeight;
        socket?.emit('setTyper', { room: currentThread?.roomId, typer: currentUser?.userName });
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [currentMessages]);


    return (
        <motion.div 
            className="h-full w-full bg-primary flex flex-cols-2" 
            style={{ width: 'calc(100vw - 300px)' }}
            initial={{ opacity: 0, x: -600  }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="w-fit h-full z-[30]">
            </div>
            <div className="w-screen h-screen overflow-hidden flex flex-col shadow-2xl shadow-accent">
                <div className="w-full h-full flex flex-col">
                    <div
                        ref={messagesEndRef}
                        className="overflow-y-scroll scrollbar-hide scroll-smooth bg-primary"
                        style={{ height: 'calc(100vh - 120px)', width: 'calc(100vw - 300px)' }}
                    >
                        {currentMessages.map((message: Message, index) => (
                            <div className="w-full h-fit flex pb-2" key={index}>
                                <ThreadMessage msg={message} key={index} currentUser={currentUser} />
                            </div>
                        ))}
                    </div>
                    <div className="h-[120px] absolute bottom-0 bg-white shadow-2xl shadow-accent" style={{ width: 'calc(100vw - 300px)' }}>
                        {currentTyper && 
                            <div className="mt-2 w-fit h-fit flex items-center justify-center gap-x-4 rounded-r-md ml-2">
                                <p className="w-full flex gap-x-4 pr-2 text-accent font-extrabold">{currentTyper} is typing <ThreeDots height={"24px"} width={"24px"} fill={"#3e47c9"} /></p>
                            </div>
                        }
                        <div className="w-full h-full flex items-center justify-center absolute bottom-0">
                            <textarea
                                    id="threadTextArea"
                                    maxLength={1000}
                                    value={message}
                                    onChange={handleMessageChange}
                                    style={{
                                        resize: "none",
                                        minHeight: "38px"
                                    }}
                                    onBlur={() => socket?.emit('setTyper', { room: currentThread?.roomId, typer: null })}
                                    className="bg-slate-100 w-1/2 h-[38px] rounded-l-md outline-none focus:outline-none p-2 threadInput text-sm absolute bottom-10 border border-accent shadow-2xl shadow-accent"
                                />
                            <div className="w-1/4 h-full absolute right-0 top-[42px]">
                                <button
                                        className="w-fit h-[38px] rounded-r-md outline-none focus:outline-none threadInput text-sm text-white bg-accent text-center border border-accent px-2 shadow-2xl shadow-accent"
                                        onClick={() =>
                                            currentUser &&
                                            currentUser.userId &&
                                            message &&
                                            sendMessage({
                                                user: {
                                                    userId: currentUser?.userId ?? "",
                                                    userName: currentUser?.userName ?? "",
                                                    // avatar: currentUser?.avatar ?? "",
                                                },
                                                payload: message,
                                                roomId: currentThread?.roomId ?? "",
                                                timeStamp: handleMessageDate(new Date()),
                                            })
                                        }
                                        >
                                        SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ThreadFeed;
