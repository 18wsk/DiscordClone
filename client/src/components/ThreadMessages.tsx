import ChatStore, { TChatStore, type Message as TMessage } from "../store/index"

const ThreadMessages = () => {

    const messages = ChatStore((state: TChatStore) => state.messages);

    const Message = ({ msg } : { msg: TMessage }) => {
        const discLogo = require("./../assets/discord_logo.png");
        return (
            <div className="h-min-[48px] bg-primary py-[8.5px] flex flex-row">
                <div className="w-[72px] flex justify-center">
                    <img src={msg.user?.avatar ?? discLogo} className="rounded-full h-[42px] w-[42px] z-1" alt={"pfp"}/>
                </div>
                <div className="w-full pr-[48px]">
                    <div className="flex flex-cols-2 gap-x-2 items-center ">
                        <p className="text-white font-semibold text-messgeName">{msg.user?.userName ?? ""}</p>
                        <p className="text-[#949ba4] text-messageTime">{msg.timeStamp}</p>
                    </div>
                    <div>
                        <div className="text-white text-sm break-all w-full">
                            {msg.payload}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="absolute left-0 bg-primary right-0 top-0 bottom-[80px] overflow-y-scroll scrollbar-hide">
            {
                messages.map((m: TMessage)  => { return <Message msg={m}/> })
            }
        </div>
    )
}

export default ThreadMessages