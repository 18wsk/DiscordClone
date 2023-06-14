import ProtectedRoute from "../components/ReUsable/ProtectedRoute";
import ProfileLink from "../components/Account/ProfileLink";
import ChatStore from "../store";
import { Thread } from "../../../server/src/types/Thread";

import { AddThreadModal } from "../components/Account/thread/AddThreadModal";
import { ToastContainer, toast } from "react-toastify";
import ThreadFeed from "../components/Account/thread/ThreadFeed";
import { trpc } from "../utils/trpc";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsFillChatSquareTextFill, BsInfoCircleFill } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";

const Account = () => {
	const threads =  ChatStore(state => state.threads);
	const setThreads = ChatStore(state => state.actions.setThreads);
	const setCurrentThread = ChatStore(state => state.actions.setCurrentThread);
	const currentThread = ChatStore(state => state.currentThread);
	const [loadThreadNav, setLoadThreadNav] = useState(false);

	trpc.thread.getThreads.useQuery({}, { 
        enabled: true, 
        refetchOnMount: true,

        onSuccess: (data: Thread[]) => {
			console.log(data)
            setThreads([...data]);
        },
        onError: (error) => {
            setThreads([]);
			toast.error(error.message, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
        }
    });

	useEffect(() => {
		console.log(currentThread)
	}, [currentThread]);
	
	const ThreadListComponent = ({ thread } : {thread: Thread}) => {
		return (
			<div className={
				clsx(
					"w-full h-[60px] flex flex-cols-2 hover:bg-secondary cursor-pointer rounded-md", 
					currentThread?.roomId === thread?.roomId && "bg-secondary"
				)} 
				onClick={() => setCurrentThread(thread)}
			>
				<button className="h-full w-[64px] flex items-center justify-center " >
					<img src={""} className="rounded-full h-[48px] w-[48px] z-1 bg-black" alt={"pfp"}/>
				</button>
				<button className="w-full h-full flex flex-cols items-center justify-center">
					<div className="w-full h-full flex flex-col justify-start ">
						<div className="w-full h-full flex items-center justify-start pl-2">
							<h1 className="text-md font-bold text-black">{ thread.name }</h1>
						</div>
						<div className="w-full h-full flex items-top justify-start pl-2">
							<h2 className="text-xs text-black">4+ new messages</h2>
						</div>
					</div>
					<div className="w-[12px] h-full flex items-center justify-center mr-2">
						{true && <div className="bg-success rounded-full h-[10px] w-[10px]"/>}
					</div>
				</button>
			</div>
		)
	};


	const ThreadDetails = () => {
		return(
			<motion.div 
				className="w-[300px] h-screen bg-secondary flex flex-col px-2 py-1 z-[10] pt-2"
				initial={{ opacity: 0, y: 600  }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.7 }}
			>
				<div className="w-full h-fit bg-white p-1 shadow-md shadow-accent flex items-center justify-center">
					<h1 className=
						"text-3xl w-full text-white font-extrabold text-center underline decoration-accent bg-secondary/70 p-2 shadow-inner"
					>	
						{currentThread?.name}
					</h1>
				</div>
				<div className="w-full h-fit flex flex-col items-start justify-start pl-2 pt-8 gap-y-4">
					<button className="text-white text-md font-bold w-full text-start flex items-center gap-x-2">{<BsFillChatSquareTextFill/>} Chat</button>
					<button className="text-white text-md font-bold w-full text-start flex items-center gap-x-2">{<RiCalendarEventFill/>} Events</button>
					<button className="text-white text-md font-bold w-full text-start flex items-center gap-x-2"> {<BsInfoCircleFill/>} Information</button>
					<button className="text-white text-md font-bold w-full text-start flex items-center gap-x-2">{<IoIosContact/>} Contact</button>
				</div>
			</motion.div>
		);
	};

	return (
		<div className="w-screen h-screen relative overflow-hidden">
			<ProtectedRoute>
				<div className={clsx(
					"w-full h-screen flex",
					currentThread && "flex-cols-3",
					!currentThread && "flex-cols-2"
				)}>
					<div className=" w-[300px] h-screen bg-slate-100 z-[500]">
						<div className="w-[300px] h-[100px]">
							<ProfileLink/>
						</div>
						<div className="w-full flex flex-col pt-4 bg-slate-100" style={{ height: 'calc(100vh - 100px)' }}>
							<div className="w-full bg-slate-100">
								<h1 className="px-2 py-2 font-bold text-gray-600">Your Communities:</h1>
							</div>
							<div className="w-full h-full overflow-y-scroll scrollbar-hide relative bg-slate-100 scroll-smooth">
								{threads.map((thread: Thread) => {
									return (
										<div className="w-full h-fit py-1 px-2 ">
											<ThreadListComponent thread={thread} key={thread.roomId}/>
										</div>
									)
								})}
							</div>
							<div className="w-full h-full flex items-end justify-center bg-slate-100">
								<div className="w-full h-[112px] flex items-center justify-center">
									<AddThreadModal/>
								</div>
							</div>
						</div>
					</div>
					{ currentThread !== null ? 
						<>
							<ThreadDetails />
							<ThreadFeed />
						</>
						: 
						<>
							<p>DISCOVER</p>
						</>
					}
				</div>
			</ProtectedRoute>
			<ToastContainer/>
		</div>
	)
}

export default Account;