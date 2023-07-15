import { Thread } from '../../../../../server/src/types/Thread'
import { AddFriendToThreadModal } from './AddFriendToThreadModal'
import { CgProfile } from 'react-icons/cg'

const ThreadNavMobile = ({
	activeThread,
	logoSmall,
	setActiveThread,
}:{
	activeThread: Thread | null,
	logoSmall: any,
	setActiveThread: (thread: Thread | null ) => void,
}) => {
	return (
		<>
			<div className="xs:block md:hidden w-full h-[36px] absolute top-0 px-4 bg-secondary flex items-center 
							shadow-md shadow-accent"
			>
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
							<h1 className="text-white/80 decoration-accent font-extrabold">
								{activeThread?.name}
							</h1>
						</div>
					</div>
				</div>
				<div className="w-fit h-full absolute top-0 right-4 flex flex-cols-2 items-center justify-center gap-x-1">
					<div className="w-[24px] h-[24px] p-[3px] flex items-center justify-center bg-accent rounded-md">
						<AddFriendToThreadModal />
					</div>
					<div className="w-fit h-[36px] p-1 flex items-center justify-center">
						<CgProfile 
							className="h-[24px] w-[24px] bg-accent p-[3px] text-white hover:bg-accent-hover 
									rounded-md" 
							onClick={() => setActiveThread(null)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default ThreadNavMobile
