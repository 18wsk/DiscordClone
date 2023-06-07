import ChatStore from "../store";
import PageSection from "../components/ReUsable/PageSection";
import ProtectedRoute from "../components/ReUsable/ProtectedRoute";
import AccountNavBar from "../components/Account/AccountNavBar";
import ProfileLink from "../components/Account/ProfileLink";

const Account = () => {
	const user = ChatStore(state => state.currentUser);

	const ThreadListComponent = () => {
		return (
			<div className="w-full h-[60px] p-1 flex flex-cols-2 ">
				<button className="h-full w-[64px] flex items-center justify-center ">
					<img src={""} className="rounded-full h-[48px] w-[48px] z-1 " alt={"pfp"}/>
				</button>
				<button className="w-full h-full flex flex-cols items-center justify-center">
					<div className="w-full h-full flex flex-col justify-start ">
						<div className="w-full h-full flex items-top justify-start pl-2">
							<h1 className="text-md font-bold underline underline-offset-2 decoration-accent">Thread Name</h1>
						</div>
						<div className="w-full h-full flex items-top justify-start pl-2">
							<h2 className="text-xs">4+ new messages</h2>
						</div>
					</div>
					<div className="w-[12px] h-full flex items-center justify-center ">
						{true && <div className="bg-success rounded-full h-[10px] w-[10px]"/>}
					</div>
				</button>
			</div>
		)
	}



	return (
		<div className="w-screen h-screen overflow-hidden scrollbar-hide bg-white">
			<ProtectedRoute>
				<PageSection>
					<div className="w-full h-full flex flex-cols-2">
						<div className=" w-[320px] h-full border border-accent-hover/10">
							<div className="w-full h-[80px]">
								<ProfileLink/>
							</div>
							<div className="w-full h-full flex flex-col overflow-hidden pt-4 ">
								<div className="w-full h-fit bg-white">
									<h1 className="px-2 py-2">Your Communities:</h1>
								</div>
								<div className="w-full h-full overflow-y-scroll scrollbar-hide rounded-md relative pb-12">
									<ThreadListComponent/>
								</div>
							</div>
							<button className="bg-accent">Create Community</button>
						</div>
						<div className="w-full h-full white ">
							<div>
							</div>
						</div>
					</div>
				</PageSection>
			</ProtectedRoute>
		</div>
	)
}

export default Account;