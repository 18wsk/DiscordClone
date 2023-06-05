import ChatStore from "../store";
import NavBar from "../components/ReUsable/NavBar";
import PageSection from "../components/ReUsable/PageSection";
import ProtectedRoute from "../components/ReUsable/ProtectedRoute";
import { User } from "../../../server/src/types/User";

const Account = () => {
	const user = ChatStore(state => state.currentUser);
	const discLogo = require("./../assets/discord_logo.png");

	const ThreadListComponent = () => {
		return (
			<div className="w-full h-[60px] border border-accent-hover/20 p-1 flex flex-cols-2 hover:bg-accent-hover/20">
				<button className="h-full w-[64px] flex items-center justify-center ">
					<img src={discLogo} className="rounded-full h-[48px] w-[48px] z-1 " alt={"pfp"}/>
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

	const ProfileListComponent = () => {
		return (
			<div>
				
			</div>
		)
	}

	const ProfileComponent = () => {
		return (
			<div className="w-full h-full flex flex-cols-2 items-center justify-center bg-accent-hover/30 rounded-md p-1">
				<div className="w-1/3 h-full flex items-top justify-center pt-2">
					<div className="relative rounded-full bg-tertiary-2 h-[64px] w-[64px] z-1">
						<img src={discLogo} className="rounded-full h-[64px] w-[64px] z-1 p-1" alt={"pfp"}/>  {/* PFP  */}
						<div className="rounded-full bg-tertiary-2 h-[12px] w-[12px] absolute bottom-0 right-0 z-2 border-2 border-tertiary-2 -translate-x-[13px] -translate-y-[2.75px]">
							<div className="rounded-full bg-green-500 h-[9px] w-[9px] absolute bottom-0 right-0 z-3 translate-x-[1px] "></div>
						</div>
						<div className="w-full h-content pt-2">
							<h1 className="text-center">{user?.userName}</h1>
						</div>
					</div>
				</div>
				<div className="w-full h-full flex flex-col items-top justify-center pt-2">
					<div className="w-full h-content flex flex-cols-2 items-center justify-center gap-x-4">
						<h2>200 friends</h2>
						<h2>1K communities</h2>
					</div>
					<div className="w-full h-full pt-2">
							<h1 className="text-center">BIO...</h1>
					</div>
				</div>
			</div>
		);
	}


	return (
		<div className="w-screen h-screen overflow-hidden scrollbar-hide bg-white">
			<NavBar />
			<div className="h-full w-full ">
			<ProtectedRoute>
				<PageSection>
						<div className="w-full h-full flex flex-cols-2 items-center justify-center gap-x-2 ">
							{/*Column 01*/}
							<div className="w-1/3 h-full flex items-center justify-center overflow-hidden">
								<div className="w-full h-full flex flex-col items-center justify-center">
									<div className="w-full h-[200px] flex flex-col items-center justify-center px-2">
										<ProfileComponent/>
									</div>
									<div className="w-full h-[calc(100vh-200px)] pt-4">
										<div className="w-full h-conent flex items-center justify-center py-2">
											<div className="w-full h-full flex justify-around items-center gap-x-2 px-2">
												<button className="w-full rounded-md bg-accent text-white">Friends</button>
												<button className="w-full rounded-md bg-accent text-white">Communities</button>
											</div>
										</div>
										<div className="w-full h-[calc(100vh-260px)] flex flex-col items-center justify-center overflow-y-scroll scrollbar-hide"> {/*overflow-y-scroll scrollbar-hide rounded-md*/}
											<div className="border border-slate-200 h-full w-full ">
												<ThreadListComponent/>
												<ProfileListComponent/>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/*Column 02*/}
							<div className="w-2/3 h-full flex flex-col items-center justify-center rounded-md border border-slate-200 relative">
								<p>Active thread and accounts when selected</p>
							</div>
						</div>
				</PageSection>
			</ProtectedRoute>
			</div>
		</div>
	)
}

export default Account;