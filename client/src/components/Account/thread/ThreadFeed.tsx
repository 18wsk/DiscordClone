import { Socket, io } from "socket.io-client";
import ChatStore from "../../../store";
import { Message } from "../../../../../server/src/types/Message";
import { useCallback, useEffect, useState } from "react";
import ThreadMessage from "./ThreadMessage";
import { trpc } from "../../../utils/trpc";
import { motion } from "framer-motion";
import { useRef } from "react";
import { TailSpin, ThreeDots } from "react-loading-icons";
import { AiOutlineSend } from "react-icons/ai";
import clsx from "clsx";

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

    const getMessagesQuery = trpc.thread.getThreadMessages.useQuery({ roomId: currentThread?.roomId ?? null}, { 
        enabled: true, 
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: true,
        onSuccess: (data: Message[]) => {
            setMessages(data);
        },
        onError: (error) => {
            setMessages([]);
            console.log(error)
        },
    });

    const useAddMessage = trpc.thread.addMessage.useMutation();

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_URL + ":" + process.env.REACT_APP_SERVER_PORT);
        setSocket(newSocket);
        return () => {
            // Clean up the socket connection when the component unmounts
            newSocket?.emit("leave room");
            newSocket.disconnect();
        };
    }, [currentThread?.roomId]);

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


    const textarea = document.getElementById("threadTextArea") as HTMLTextAreaElement;
    
    const sendMessage = useCallback(async ({ 
        message,
    }: { 
        message: Message
    }) => {
        if (textarea) {
            textarea.style.height = "42px"; // Reset the height to the initial value
            textarea.value = ''; // Reset the value to an empty string
            setDivHeight(`120px`);
        }
        await useAddMessage.mutateAsync({ message }, {
            onSuccess: (data) => {
                socket?.emit('sendMessage', { room: currentThread?.roomId, message });
                addMessage(data);
                setMessage('');
                socket?.emit('setTyper', { room: currentThread?.roomId, typer: null });
            },
        });
    }, [addMessage, currentThread?.roomId, socket, textarea, useAddMessage]);

    const handleMessageDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    const [divHeight, setDivHeight] = useState("120px");

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setMessage(value);
        const textarea = event.target;
        textarea.style.height = "42px"; // Set the minimum height
        // Calculate the required height based on the content
        const scrollHeight = textarea.scrollHeight;
        const clientHeight = textarea.clientHeight;
        const height = Math.max(scrollHeight, clientHeight);
        textarea.style.height = (height > 42) ? height + "px" : "42";
        textarea.scrollTop = scrollHeight - clientHeight;
        setDivHeight((height > 120) ? `${scrollHeight + 60}px`: "120px" );
        socket?.emit('setTyper', { room: currentThread?.roomId, typer: currentUser?.userName });
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [currentMessages]);

    const textAreaElement = document.getElementById("threadTextArea") as HTMLTextAreaElement;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
            }
        };
    
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !event.shiftKey && getMessagesQuery.isLoading === false) {
                sendMessage({
                    message: {
                        user: {
                            userId: currentUser?.userId ?? "",
                            userName: currentUser?.userName ?? "",
                            pfp: currentUser?.pfp ?? null,
                        },
                        payload: message.trim(),
                        roomId: currentThread?.roomId ?? "",
                        timeStamp: handleMessageDate(new Date()),
                    }
                })
            }
        };

        if (textAreaElement) {
            textAreaElement.addEventListener('keydown', handleKeyDown);
            textAreaElement.addEventListener('keyup', handleKeyUp);
        }
        
        return () => {
            textAreaElement?.removeEventListener('keydown', handleKeyDown);
            textAreaElement?.removeEventListener('keyup', handleKeyUp);
        }
    }, [currentThread?.roomId, currentUser?.pfp, currentUser?.userId, currentUser?.userName, getMessagesQuery.isLoading, message, sendMessage, textAreaElement]);


    return (
        <motion.div 
            className="h-full w-full flex flex-cols-2 xs:w-100vw md:w-[calc(100vw - 300px)]" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
        >
            <div className="w-fit h-full">
            </div>
            <div className="w-screen h-screen overflow-hidden">
                <div className="w-full h-full flex flex-col">
                    <div
                        ref={messagesEndRef}
                        className="overflow-y-scroll scrollbar-hide scroll-smooth bg-primary w-[calc(100vw - 300px)]"
                        style={{height: `calc(100vh - ${divHeight})`}}
                    >
                        {getMessagesQuery.isLoading
                            ?   <div 
                                    className="flex items-center justify-center z-10 "
                                    style={{height: `calc(100vh - ${divHeight})`, width: `calc(100vw - 300px)`}}
                                >
                                    <TailSpin 
                                        stroke={"#3e47c9"}
                                        speed={.75} 
                                        height={100} 
                                        width={100} 
                                        className=" w-fit h-fit flex items-center justify-center p-2"
                                    /> 
                                </div>
                            :   currentMessages.map((message: Message, index) => (
                                <div className="xs:w-full xs:px-2 h-fit flex pb-2 justify-center " key={index}>
                                    <ThreadMessage msg={message} key={index} />
                                </div>
                        ))}
                    </div>
                    <div 
                        className={`shadow-lg shadow-accent`} 
                        style={{height: divHeight}}
                    >
                        {currentTyper && 
                            <div className="mt-2 w-1/3 h-fit flex items-center justify-center gap-x-4 rounded-r-md ml-2">
                                <p className="w-full flex gap-x-4 pr-2 text-white font-bold text-sm">
                                    {currentTyper} is typing <ThreeDots height={"24px"} width={"24px"} fill={"#3e47c9"} />
                                </p>
                            </div>
                        }
                        <div 
                            className={`flex items-center justify-center threadInputBlock `} 
                            style={{height: `${divHeight}`}}
                        >
                            <div className="relative flex bottom-5 lg:w-1/2 xs:w-3/4"
                                style={{height: `${divHeight}`}}>
                                <textarea
                                        id="threadTextArea"
                                        maxLength={500}
                                        value={message}
                                        onChange={handleMessageChange}
                                        style={{
                                        resize: "none",
                                        minHeight: "42px",
                                        paddingRight: "44px",
                                        paddingLeft: "8px",
                                        paddingTop: "8px",
                                        paddingBottom: "8px",
                                    }}
                                    rows={1}
                                    onBlur={() => socket?.emit('setTyper', { room: currentThread?.roomId, typer: null })}
                                    className="bg-tertiary rounded-md outline-none focus:outline-none threadInput text-threadText shadow-2xl shadow-accent 
                                                text-white w-full absolute bottom-10 pr-18 "
                                />
                                <button 
                                    className={clsx(
                                        "absolute right-4 bottom-[45px] h-[32px] w-[32px] rounded-md outline-none focus:outline-none p-2 threadInput",
                                        message.length === 0 && "bg-primary cursor-default disabled",
                                        message.length > 0 && "bg-accent"
                                    )}
                                    onClick={() =>
                                        !getMessagesQuery.isLoading &&
                                        currentUser &&
                                        currentUser.userId &&
                                        message &&
                                        sendMessage({
                                            message: {
                                                user: {
                                                    userId: currentUser?.userId ?? "",
                                                    userName: currentUser?.userName ?? "",
                                                    pfp: currentUser?.pfp ?? null,
                                                },
                                                payload:  message.trim(),
                                                roomId: currentThread?.roomId ?? "",
                                                timeStamp: handleMessageDate(new Date()),
                                            }
                                        })
                                    }
                                >
                                    <AiOutlineSend className={clsx(
                                        message.length === 0 && "fill-accent",
                                        message.length > 0 && "fill-white"
                                    )}/>
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
