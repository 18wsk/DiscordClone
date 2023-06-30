import clsx from "clsx";
import { Message } from "../../../../../server/src/types/Message";
import ChatStore from "../../../store";
import { FaUserFriends } from "react-icons/fa";
import { BsPersonAdd } from "react-icons/bs";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ThreadMessage = ({ msg } : { msg: Message  }) => {
    const currentUser = ChatStore(state => state.currentUser);
    const addFriend = ChatStore(state => state.actions.addFriend);

    const [isFriend, setIsFriend] = useState(currentUser?.friends.some((obj) => obj.userName === msg.user.userName) ?? false);


    useEffect(() => {
        setIsFriend(currentUser?.friends.some((obj) => obj.userName === msg.user.userName) ?? false);
    }, [currentUser, msg]);

    const addFriendToCurrentUser = trpc.thread.addFriend.useMutation();

    const handleAddFriend = async () => {
        if (currentUser?.userId && msg.user?.userId) {
            await addFriendToCurrentUser.mutateAsync(
                {
                    currentId: currentUser.userId,
                    friend: {
                        id: msg.user.userId,
                        userName: msg.user.userName,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success(`You have successfully added ${msg.user.userName}`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        addFriend({userName: msg.user.userName, id: msg.user.userId});
                        setIsFriend(true);
                    }, 
                    onError: (error) => {
                        toast.error(error.message, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setIsFriend(false);
                    },
                }
            );
        }
    }

    const FriendDisplay = ({ isFriend }: { isFriend: boolean }) => {
        if (isFriend) {
            return (
                <p className="text-[#949ba4] text-messageTime"><FaUserFriends fill={"green"} className="w-[12px] h-[12px]"/></p>
            )}
        else {
            return (
                <button 
                    className="text-[#949ba4] text-messageTime"
                    onClick={() => handleAddFriend()}
                >
                    <BsPersonAdd fill={"#3e47c9"} className="w-[12px] h-[12px]"/>
                </button>
            )}
    };


    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={clsx(
                "h-min-[48px] w-5/6 flex flex-row justify-center py-[12px] rounded-md",
            )}>
                <div className="w-[72px] flex justify-center">
                    <img src={msg.user?.pfp ?? ""} className="object-cover aspect-auto rounded-full h-[42px] w-[42px] z-1 bg-accent" alt={"pfp"}/> 
                </div>
                <div className="w-full pr-[48px]">
                    <div className="flex flex-cols-3 gap-x-2 items-center ">
                        <p className="text-white font-semibold text-messgeName">{msg.user.userName}</p>
                        <p className="text-[#949ba4] text-messageTime">{
                            msg.timeStamp 
                            ?? 
                            new Date().toLocaleString('en-US', { 
                                month: '2-digit', 
                                day: '2-digit', 
                                year: 'numeric', 
                                hour: 'numeric', 
                                minute: 'numeric', 
                                hour12: true 
                            })}
                        </p>
                        <div className="flex items-center justify-end">
                            {currentUser?.userName !== msg.user.userName && 
                                <FriendDisplay isFriend={isFriend}/>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="text-[#dbdee1] font-Inter text-sm break-all w-full whitespace-normal break-words">
                            {msg.payload}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreadMessage;