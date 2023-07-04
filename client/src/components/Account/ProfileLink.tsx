import ChatStore from "../../store";

const ProfileLink = () => {
    const user = ChatStore(state => state.currentUser);
    return (
        <div className="w-full h-full flex flex-cols-2 items-center justify-center gap-x-4 px-2 bg-[#232428]">
            <div className="w-1/3 h-full flex items-center justify-center">
                <div className="relative rounded-full bg-black h-[64px] w-[64px] z-1">
                    <img src={user?.pfp ?? ""} className="object-cover aspect-auto rounded-full h-[64px] w-[64px] z-1" alt={"pfp"}/>
                    <div className="rounded-full bg-green-500 h-[12px] w-[12px] absolute bottom-0 right-0 z-3 -translate-x-1/2 -translate-y-1/2 "/>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-top justify-center">
                <h1 className="text-start text-lg font-extrabold text-white">{user?.userName}</h1>
            </div>
        </div>
    );
}

export default ProfileLink;