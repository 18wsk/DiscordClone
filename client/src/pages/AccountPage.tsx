import ProtectedRoute from "../components/ReUsable/ProtectedRoute";
import ProfileLink from "../components/Account/ProfileLink";
import ChatStore from "../store";
import { Thread } from "../../../server/src/types/Thread";
import { AddThreadModal } from "../components/Account/thread/AddThreadModal";
import { ToastContainer, toast } from "react-toastify";
import ThreadFeed from "../components/Account/thread/ThreadFeed";
import { trpc } from "../utils/trpc";
import clsx from 'clsx';
import { ThreadListComponent } from "../components/Account/thread/ThreadListItem";
import { CgProfile } from 'react-icons/cg';
import { AddFriendToThreadModal } from "../components/Account/thread/AddFriendToThreadModal";


const Account = () => {
	const threads =  ChatStore(state => state.threads);
	const setThreads = ChatStore(state => state.actions.setThreads);
	const setCurrentThread = ChatStore(state => state.actions.setCurrentThread);
	const currentThread = ChatStore(state => state.currentThread);
	const logo = require("../assets/logo.png");
	const activeThread = ChatStore(state => state.currentThread);
	const logoSmall = require('../assets/logo_small.png');
	const setActiveThread = ChatStore(state => state.actions.setCurrentThread);

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


	return (
		<div className="w-screen h-screen relative overflow-hidden">
			<ProtectedRoute>
				<div className={clsx(
					"w-screen h-screen flex flex-cols-2",
				)}>
					<div className={
						clsx(
							currentThread === null && `xs:w-screen sm:w-[300px] h-screen bg-slate-100`,
							currentThread !== null && "xs:hidden md:block w-[300px]",
						)}>
						<div className="xs:w-screen sm:w-[300px] h-[100px] cursor-pointer" onClick={() => setCurrentThread(null)}>
							<ProfileLink/>
						</div>
						<div className="w-full flex flex-col pt-4 bg-[#2b2d31]" style={{ height: 'calc(100vh - 100px)' }}>
							<div className="w-full bg-[#2b2d31]">
								<h1 className="px-2 py-2 font-bold text-[#949ba4]">Your Communities:</h1>
							</div>
							<div className="w-full h-full overflow-y-scroll scrollbar-hide relative bg-[#2b2d31] scroll-smooth">
								{threads.map((thread: Thread) => {
									return (
										<div className="w-full h-fit py-1 px-2" key={thread.roomId}>
											<ThreadListComponent currentThread={currentThread} setCurrentThread={setCurrentThread} thread={thread} key={thread.roomId}/>
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
					{ currentThread !== null &&
						<div className="xs:block md:hidden w-full h-[36px] absolute top-0 px-4 bg-secondary flex items-center shadow-md shadow-accent">
							<div className="w-fit h-[36px] p-1 absolute left-4 top-[0px] flex items-center justify-center">
								<div className="w-full h-[36px] flex flex-cols-2 items-center justify-center">
									<div className="w-full h-full flex flex-col items-center justify-center">
										<img 
											src={logoSmall} 
											className=" object-cover aspect-auto h-[24px] w-[24px] z-1 p-1" 
											alt={"pfp"}
										/> 
									</div>
									<div className="w-full h-full flex flex-col items-center justify-center">
										<h1 className="text-white/80 decoration-accent font-extrabold">{activeThread?.name}</h1>
									</div>
								</div>
							</div>
							<div className="w-fit h-full absolute top-0 right-4 flex flex-cols-2 items-center justify-center gap-x-1">
								<div className="w-[24px] h-[24px] p-[3px] flex items-center justify-center bg-accent rounded-md">
									<AddFriendToThreadModal buttonHeight="24" buttonWidth="24"/>
								</div>
								<div className="w-fit h-[36px] p-1 flex items-center justify-center">
									<CgProfile className="h-[24px] w-[24px] bg-accent p-[3px] text-white hover:bg-accent-hover rounded-md" onClick={() => setActiveThread(null)}/>
								</div>
							</div>
						</div>
					}
					<div className="w-full h-full bg-primary xs:pt-[36px] md:pt-4">
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