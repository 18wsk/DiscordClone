import clsx from "clsx";
import { Friend } from "../../../../server/src/types/Friend";



export const FriendListComponent = ({friend} : {friend: Friend}) => {
    return (
        <div className="w-full h-[60px] flex flex-cols-2 cursor-default rounded-md" 
        >
            <div className="h-full w-[64px] flex items-center justify-center " >
            <div className="relative rounded-full bg-black h-[64px] w-[64px] z-1">
                    <img 
                        src={friend?.pfp ?? ""} 
                        className="object-cover aspect-auto rounded-full h-[64px] w-[64px] z-1" 
                        alt={"pfp"}
                    />
                    <div className={
                        clsx(
                            "rounded-full h-[15px] w-[15px] absolute bottom-0 right-2 z-4",
                            friend?.status && "bg-green-500",
                            !friend?.status && "bg-gray-500"
                        )}
                    />
                </div>
            </div>
            <div className="w-full h-full flex flex-cols items-center justify-center">
                <div className="w-full h-full flex flex-col justify-start ">
                    <div className="w-full h-full flex items-center justify-start pl-2">
                        <h1 className="text-md font-bold text-white">{ friend.userName }</h1>
                    </div>
                </div>
                
            </div>
        </div>
    )
};