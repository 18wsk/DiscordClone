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
import ThreadNavMobile from "../components/Account/thread/ThreadNavMobile";
import { Friend } from "../../../server/src/types/Friend";
import { FriendListComponent } from "../components/Account/FriendListComponent";
import { FindFriendsModal } from "../components/Account/FindFriendsModal";


const Account = () => {
	const threads =  ChatStore(state => state.threads);
	const setThreads = ChatStore(state => state.actions.setThreads);
	const setCurrentThread = ChatStore(state => state.actions.setCurrentThread);
	const currentThread = ChatStore(state => state.currentThread);
	const logo = require("../assets/logo.png");
	const activeThread = ChatStore(state => state.currentThread);
	const logoSmall = require('../assets/logo_small.png');
	const setActiveThread = ChatStore(state => state.actions.setCurrentThread);
	const currentUser = ChatStore(state => state.currentUser);

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

	// useEffect(() => {
    //     if (socket) {
    //         socket.on("connect", () => {
    //             socket.emit('joinRoom', currentThread?.roomId);
    //         });
    //         socket.on('receiveMessage', (message: Message) => {
    //             addMessage(message);
    //             // Handle the received message as needed
    //         });
    //         socket.on('typing', (typer: string) => {
    //             setCurrentTyper(typer);
    //         });
    //     }
    // }, [addMessage, currentThread?.roomId, setCurrentTyper, socket]);

	return (
		<div className="w-screen h-screen relative overflow-hidden">
			<ProtectedRoute>
				<div className={clsx(
					"w-screen h-screen flex flex-cols-2",
				)}>
					<div className={
						clsx(
							currentThread === null && `xs:w-screen md:w-[300px] h-screen bg-slate-100`,
							currentThread !== null && "xs:hidden md:block w-[300px]",
						)}>
						<div className={
							clsx(
								"h-[100px] cursor-pointer bg-tertiary ",
								currentThread === null && "xs:w-screen md:w-[300px] flex items-center xs:justify-center md:justify-start py-1",
								currentThread !== null && "xs:hidden md:block w-[300px]",
							)}
						onClick={() => setCurrentThread(null)}>
							<ProfileLink/>
						</div>
						<div 
							className="w-full flex flex-col xs:items-center xs:justify-center bg-secondary" 
							style={{ height: 'calc(100vh - 100px)' }}
						>
							<div className="xs:w-1/2 md:w-full bg-secondary">
								<h1 className="px-2 py-2 font-bold text-[#949ba4]">Your Communities:</h1>
							</div>
							<div className="xs:w-1/2 md:w-full h-full overflow-y-scroll scrollbar-hide relative bg-secondary 
										scroll-smooth"
							>
								{threads.map((thread: Thread) => {
									return (
										<div className="w-full h-fit py-1 px-2" key={thread.roomId}>
											<ThreadListComponent 
												currentThread={currentThread} 
												setCurrentThread={setCurrentThread} 
												thread={thread} 
												key={thread.roomId}
											/>
										</div>
									)
								})}
							</div>
							<div className="xs:w-1/2 md:w-full bg-secondary">
								<h1 className="px-2 py-2 font-bold text-[#949ba4]">Your Friends:</h1>
							</div>
							<div className="xs:w-1/2 md:w-full h-full overflow-y-scroll scrollbar-hide relative bg-secondary 
										scroll-smooth"
							>
								{currentUser?.friends.map((friend: Friend) => {
									return (
										<div className="w-full h-fit py-1 px-2" key={friend.id}>
											<FriendListComponent friend={friend} key={friend.id}/>
										</div>
									)
								})}
							</div>
							<div className="w-full xs:h-[90px] md:h-[100px] flex items-end justify-center bg-secondary pb-4">
								<div className="w-full h-full flex items-center justify-center gap-x-4">
									<AddThreadModal/>
									<FindFriendsModal/>
								</div>
							</div>
						</div>
					</div>
					{ currentThread !== null ?
						<div className="w-full h-full bg-primary xs:pt-[36px] md:pt-4">
							<ThreadFeed/>
							<ThreadNavMobile
							activeThread={activeThread}
							logoSmall={logoSmall}
							setActiveThread={setActiveThread}
							/>
						</div>
						: 
						<div className="xs:hidden md:block w-full h-full bg-primary xs:pt-[36px] md:pt-4">
							<div className="w-full h-full flex flex-col items-center justify-center">
								<div className="w-fit h-fit flex flex-col items-center justify-center">
									<img src={logo} alt="logo" className="object-contain h-[200px] w-[400px]"/>
									<p className="text-white text-lg font-extrabold text-center">
										Join or create a community and start connecting today.
									</p>
								</div>
							</div>
						</div>
					}
				</div>
			</ProtectedRoute>
			<ToastContainer/>
		</div>
	)
}

export default Account;