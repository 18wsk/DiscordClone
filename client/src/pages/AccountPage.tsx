import ChatStore from "../store";
import NavBar from "../components/ReUsable/NavBar";

const Account = () => {
	const user = ChatStore.getState().currentUser;

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