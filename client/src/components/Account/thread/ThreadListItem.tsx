import clsx from "clsx";
import { Thread } from "../../../../../server/src/types/Thread";
import { AddFriendToThreadModal } from "./AddFriendToThreadModal";


export const ThreadListComponent = (
    { 
        currentThread,
        setCurrentThread,
        thread 
    } : {
        currentThread: Thread | null,
        setCurrentThread: (thread: Thread | null) => void,
        thread: Thread
    }) => {
    return (
        <div className={
            clsx(
                "w-full h-[60px] flex flex-cols-2 hover:bg-[#4e5058]/40 cursor-pointer rounded-md", 
                currentThread?.roomId === thread?.roomId && "bg-[#4e5058]/40 shadow-sm shadow-accent"
            )} 
            onClick={() => setCurrentThread(thread)}
        >
            <div className="h-full w-[64px] flex items-center justify-center " >
                <img src={thread.img ?? ""} className="object-cover aspect-auto rounded-full h-[48px] w-[48px] z-1 bg-black" alt={"pfp"}/>
            </div>
            <div className="w-full h-full flex flex-cols items-center justify-center">
                <div className="w-full h-full flex flex-col justify-start ">
                    <div className="w-full h-full flex items-center justify-start pl-2">
                        <h1 className="text-md font-bold text-white">{ thread.name }</h1>
                    </div>
                    {/* <div className="w-full h-full flex items-top justify-start pl-2">
                        <h2 className="text-xs text-white">4+ new messages</h2>
                    </div> */}
                </div>
                {
                    currentThread?.roomId === thread?.roomId && 
                    <div className="w-[24px] h-full flex items-center justify-center mr-2 ">
                        <AddFriendToThreadModal/>
                    </div>
                }
                {/* <div className="w-[12px] h-full flex items-center justify-center mr-2">
                    {true && <div className="bg-success rounded-full h-[10px] w-[10px]"/>}
                </div> */}
            </div>
        </div>
    )
};