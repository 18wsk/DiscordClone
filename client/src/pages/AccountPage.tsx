import ProtectedRoute from "../components/ReUsable/ProtectedRoute";
import ProfileLink from "../components/Account/ProfileLink";
import ChatStore from "../store";
import { Thread } from "../../../server/src/types/Thread";
import { AddThreadModal } from "../components/Account/thread/AddThreadModal";
import { ToastContainer, toast } from "react-toastify";
import ThreadFeed from "../components/Account/thread/ThreadFeed";
import { trpc } from "../utils/trpc";
import clsx from 'clsx';
import { AddFriendToThreadModal } from "../components/Account/thread/AddFriendToThreadModal";


const Account = () => {
	const threads =  ChatStore(state => state.threads);
	const setThreads = ChatStore(state => state.actions.setThreads);
	const setCurrentThread = ChatStore(state => state.actions.setCurrentThread);
	const currentThread = ChatStore(state => state.currentThread);
	const logo = require("../assets/logo.png");

	trpc.thread.getThreads.useQuery({}, { 
        enabled: true, 
        refetchOnMount: true,

        onSuccess: (data: Thread[]) => {
            setThreads([...data]);
        },
        onError: (error) => {
            setThreads([]);
			toast.error(error.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
        }
    });
	
	const ThreadListComponent = ({ thread } : {thread: Thread}) => {
		return (
			<div className={
				clsx(
					"w-full h-[60px] flex flex-cols-2 hover:bg-[#4e5058]/40 cursor-pointer rounded-md", 
					currentThread?.roomId === thread?.roomId && "bg-[#4e5058]/40"
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


	return (
		<div className="w-screen h-screen relative overflow-hidden">
			<ProtectedRoute>
				<div className={clsx(
					"w-screen h-screen flex flex-cols-2",
				)}>
					<div className={
						clsx(
							currentThread === null && `xs:w-screen md:w-[300px] h-screen bg-slate-100 z-[500] `,
							currentThread !== null && "xs:hidden md:block",
						)}>
						<div className="xs:w-screen md:w-[300px] h-[100px] cursor-pointer" onClick={() => setCurrentThread(null)}>
							<ProfileLink/>
						</div>
						<div className="w-full flex flex-col pt-4 bg-[#2b2d31]" style={{ height: 'calc(100vh - 100px)' }}>
							<div className="w-full bg-[#2b2d31]">
								<h1 className="px-2 py-2 font-bold text-[#949ba4]">Your Communities:</h1>
							</div>
							<div className="w-full h-full overflow-y-scroll scrollbar-hide relative bg-[#2b2d31] scroll-smooth">
								{threads.map((thread: Thread) => {
									return (
										<div className="w-full h-fit py-1 px-2">
											<ThreadListComponent thread={thread} key={thread.roomId}/>
											
										</div>
									)
								})}
							</div>
							<div className="w-full h-[112px] flex items-end justify-center bg-[#2b2d31]">
								<div className="w-full h-[112px] flex items-center justify-center">
									<AddThreadModal/>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full h-full bg-primary">
						{ currentThread !== null ? 
							<ThreadFeed/>
							: 
							<div className="w-full h-full flex flex-col items-center justify-center">
								<div className="w-fit h-fit flex flex-col items-center justify-center">
									<img src={logo} alt="logo" className="object-contain h-[200px] w-[400px]"/>
									<p className="text-white text-lg font-extrabold text-center">
										Join or create a community and start connecting today.
									</p>
								</div>
							</div>
						}
					</div>
				</div>
			</ProtectedRoute>
			<ToastContainer/>
		</div>
	)
}

export default Account;