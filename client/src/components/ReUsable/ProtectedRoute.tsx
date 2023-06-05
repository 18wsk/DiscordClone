import { TailSpin } from "react-loading-icons";
import ChatStore from "../../store";
import { trpc } from "../../utils/trpc";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }: {children: any}) => {
	const setActiveUser = ChatStore(state => state.actions.setCurrentUser);

    const getUserQuery = trpc.getAccount.useQuery({}, { 
        enabled: true, 
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
        onSuccess: (data) => {
            setActiveUser(data);
        }
    });

        if (getUserQuery.isSuccess) return children
        if (getUserQuery.isLoading) {
            return (
                <div className="w-screen h-screen bg-primary flex items-center justify-center">
                    <TailSpin className="w-1/4 h-1/4"  stroke="#3e47c9" speed={.75} />
                </div>
                );
        }

        if (getUserQuery.isError) return (
            <div className="w-screen h-screen overflow-hidden scrollbar-hide">
                <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center">
                    <div className="w-full h-1/3">
                        <h1 className="text-black font-bold text-4xl text-center"> 
                            <span className="text-5xl text-accent">ERROR: </span>{ getUserQuery.error.message }
                        </h1>
                        <div className="w-full flex items-center justify-center pt-4">
                            <Link to="/login" className="w-[200px] h-1/2 flex items-center justify-center">
                                <button 
                                    className="bg-accent hover:bg-accent-hover rounded-md flex items-center justify-center text-white font-bold text-center w-full h-[36px] p-1 shadow-lg shadow-accent/50 hover:shadow-accent-hover/50"
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ProtectedRoute