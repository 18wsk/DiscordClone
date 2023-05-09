import ThreadMessages from "../components/ThreadMessages";
import ThreadInput from "../components/ThreadInput";
import ThreadProfileComponent from "../components/ThreadProfileComponent";

const Thread = () => {
	return (
		<div className="w-screen h-screen scrollbar-hide bg-primary relative">
			<div className="h-full bg-primary absolute left-[312px] right-0 px-2 py-2">
				<ThreadMessages/>
				<ThreadInput/>
			</div>
			<div className="h-screen w-[312px] grid grid-flow-col auto-cols-2">
				<div className="h-screen w-[72px] bg-tertiary-2">
					{/* Open Threads*/}
				</div>
				<div className="h-screen w-[240px] bg-secondary">
					{/*Thread info?? */}
				</div>
			</div>
			<ThreadProfileComponent/>
		</div>
	)
}

export default Thread