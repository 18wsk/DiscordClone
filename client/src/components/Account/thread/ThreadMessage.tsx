import clsx from "clsx";
import { Message } from "../../../../../server/src/types/Message";
import { User } from "../../../../../server/src/types/User";

const ThreadMessage = ({ msg, currentUser } : { msg: Message, currentUser: User | null }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={clsx(
                "h-min-[48px] w-5/6 flex flex-row justify-center py-[12px] rounded-md",
                // currentUser && (msg.user.userId === currentUser.userId) ? "bg-secondary/20 border border-secondary/40 shadow-sm shadow-secondary/60" : "bg-primary"
            )}>
                <div className="w-[72px] flex justify-center">
                    <img src={""} className="rounded-full h-[42px] w-[42px] z-1 bg-accent" alt={"pfp"}/> 
                </div>
                <div className="w-full pr-[48px]">
                    <div className="flex flex-cols-2 gap-x-2 items-center ">
                        <p className="text-white font-semibold text-messgeName">{msg.user.userName}</p>
                        <p className="text-[#949ba4] text-messageTime">{msg.timeStamp ?? new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
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