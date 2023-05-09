import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../websocket";
import ChatStore, { TChatStore } from "../store";

const ThreadInput = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const enterRepeatFlag = useRef(false);

    const currentUser  = ChatStore((state: TChatStore) => state.currentUser);


    const handleMessageSend = async () => {
        sendMessage({
            user: currentUser,
            payload: currentMessage,
            timeStamp: new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
        });
        setCurrentMessage("");
    } 

    const handleMessageChange = (event: any) => {
        setCurrentMessage(event.target.value);
    }

    const handleEnter = (event: any) => {
        if (event.key === "Enter" && !enterRepeatFlag.current) {
            enterRepeatFlag.current = true;
            event.preventDefault();
            event.stopPropagation();
            handleMessageSend();
        }
    }

    useEffect(() => {
        enterRepeatFlag.current = false;
    });

    return (
        <div className="absolute bottom-[24px] left-[16px] right-[16px]">         
            <input 
                className="w-full px-[60px] py-[11px] rounded-lg bg-[#383a40] h-[44px] focus:outline-none text-[#dbdee1]" 
                value={currentMessage} 
                onChange={handleMessageChange}
                onKeyDown={handleEnter}
            />      
        </div>
    )
}

export default ThreadInput;
