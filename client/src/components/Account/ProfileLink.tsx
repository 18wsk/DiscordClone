import clsx from "clsx";
import ChatStore from "../../store";

const ProfileLink = () => {
    const user = ChatStore(state => state.currentUser);
    const setActiveThread = ChatStore(state => state.actions.setCurrentThread);

    return (
        <div 
            className="w-[300px] h-full flex xs:flex-rows-2 xs:flex-col md:flex-row md:flex-cols-2 items-center 
                    justify-center gap-x-4 px-2 bg-tertiary " 
            onClick={() => setActiveThread(null)}
        >
            <div className="w-fit h-full flex items-center justify-center">
                <div className="relative rounded-full bg-black h-[64px] w-[64px] z-1">
                    <img 
                        src={user?.pfp ?? ""} 
                        className="object-cover aspect-auto rounded-full h-[64px] w-[64px] z-1" 
                        alt={"pfp"}
                    />
                    <div className={
                        clsx(
                            "rounded-full h-[15px] w-[15px] absolute bottom-0 right-2 z-4 ",
                            user?.status && "bg-green-500",
                            !user?.status && "bg-gray-500"
                        )}
                    />
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-top justify-center">
                <h1 className="md:text-start xs:text-center text-lg font-extrabold text-white">{user?.userName}</h1>
            </div>
        </div>
    );
}

export default ProfileLink;