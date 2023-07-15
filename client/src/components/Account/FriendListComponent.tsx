import { Friend } from "../../../../server/src/types/Friend";



export const FriendListComponent = ({friend} : {friend: Friend}) => {
    return (
        <div className="w-full h-[60px] flex flex-cols-2 cursor-default rounded-md" 
        >
            <div className="h-full w-[64px] flex items-center justify-center " >
                <img 
                    src={friend.pfp ?? ""} 
                    className="object-cover aspect-auto rounded-full h-[48px] w-[48px] z-1 bg-black" 
                    alt={"pfp"}/>
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