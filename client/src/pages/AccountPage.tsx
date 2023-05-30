import ChatStore from "../store";
import NavBar from "../components/ReUsable/NavBar";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";

const Account = () => {
	const user = ChatStore(state => state.currentUser);
	
	const setCurrentUser = ChatStore(state => state.actions.setCurrentUser);
	const userQuery = trpc.getUser.useQuery({userId: user?.userId});


	useEffect(() => {
		if (userQuery.data) {
			setCurrentUser(userQuery.data);
		}
	}, [setCurrentUser, userQuery.data]);

	return (
		<div className="w-screen h-screen overflow-auto scrollbar-hide">
            <NavBar />
            <div className="w-full h-full overflow-auto scrollbar-hide bg-primary">
				<h1>Account</h1>
				{
            	    <div className="w-full flex flex-col items-center justify-center">
            	        <p>Email: {user?.email}</p>
            	        <p>Password: {user?.password.password}</p>
            	        <p>UserName: {user?.userName}</p>
            	    </div>
            	}
            </div>
        </div>
	)
}

export default Account;