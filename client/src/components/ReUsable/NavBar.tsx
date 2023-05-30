
import { Link } from 'react-router-dom'
import ChatStore from '../../store';
import { useEffect } from 'react';
import { trpc } from '../../utils/trpc';

const DeskTopView = () => {

    const setActiveUser = ChatStore.getState().actions.setCurrentUser;

    const { refetch: refetchLogout } = trpc.logout.useQuery({}, { 
        enabled: false, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000,
    });

    const handleLogout = () => {
        refetchLogout();
        setActiveUser(null);
    }

    return (
        <>
            { ChatStore.getState().currentUser !== null
                ? 
                    <>
                        <Link to="/account" className="w-full h-full flex items-center justify-center">
                            <button 
                                className="bg-accent rounded-full flex items-center justify-center text-white font-bold text-center w-24 p-1 hover:bg-accent-hover"
                                onClick={() => handleLogout() }
                            >
                                Account
                            </button>
                        </Link>
                        <Link to="/" className="w-full h-full flex items-center justify-center">
                            <button 
                                className="bg-accent rounded-full flex items-center justify-center text-white font-bold text-center w-24 p-1 hover:bg-accent-hover"
                                onClick={() => handleLogout() }
                            >
                                
                            </button>
                        </Link>
                    </>
                    
                :
                    <>
                        <Link to="/login" className="w-full h-full flex items-center justify-center">
                            <button 
                                className="bg-accent rounded-full flex items-center justify-center text-white font-bold text-center w-24 p-1 hover:bg-accent-hover"
                            >
                                Login
                            </button>
                        </Link>
                        <Link to="/signup" className="w-full h-full flex items-center justify-center">
                            <button 
                                className="bg-accent rounded-full flex items-center justify-center text-white font-bold text-center w-24 p-1 hover:bg-accent-hover"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </>
                
            }
        </>
    )
};


const NavBar = () => {
    const logo = require('../../assets/Logo.jpg');
    return (
        <div className="sticky top-0 flex w-full h-[60px] justify-between z-[50] bg-white shadow-2xl shadow-white/60">
            <div className="h-full flex w-full  items-center md:justify-start xs:justify-center">
                <Link to="/" className="h-[60px] flex items-center justify-center">
                    <img src={logo} alt="logo" className="h-full md:w-[300px] " />
                </Link>
            </div>
            <div className="xs:hidden md:flex h-full md:w-[300px] items-center justify-end">
                <DeskTopView />
            </div>
        </div>
    )
}

export default NavBar