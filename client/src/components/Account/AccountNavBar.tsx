
import { Link } from 'react-router-dom'
import ChatStore from '../../store';
import { trpc } from '../../utils/trpc';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import ProfileLink from './ProfileLink';

const DeskTopView = ({
    logo,
    currentUser,
    handleLogout
}:{
    logo: string,
    currentUser:  boolean,
    handleLogout: () => void;
}) => {

    return (
        <div className='h-full w-full flex items-center'>
            <ProfileLink/>
        </div>
    )
};

const MobileView = ({
    logo,
    currentUser,
    handleLogout
}:{
    logo: string,
    currentUser:  boolean ,
    handleLogout: () => void;
}) => {

    return(
        <div className='w-full h-full flex jusitfy-between relative'>
        <div className='h-full w-full flex items-center justify-start'>
            <Link to="/" className="h-full flex items-center justify-center">
                    <img src={logo} alt="logo" className="h-2/3 w-[160px] aspect-video" />
            </Link>
        </div>
        <div className='h-full w-full flex items-center justify-end relative'>
            <Menu>
                <Menu.Button className="mr-8">
                    <AiOutlineMenu fill={"#3e47c9"} className="p-1 rounded-lg w-full h-full hover:bg-accent/30 " />
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-90 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute top-[28px] right-0 bg-white w-screen shadow-lg shadow-accent/20 border-b broder-l border-r border-accent/10 pb-4">
                        <Menu.Item>
                            <Link to="/" className="w-full h-full flex items-center justify-center">
                                <button 
                                    className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                >
                                    Home
                                </button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/product" className="w-full h-full flex items-center justify-center">
                                <button 
                                    className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                >
                                    Product
                                </button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/about" className="w-full h-full flex items-center justify-center">
                                <button 
                                    className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                >
                                    About
                                </button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                        <Link to="/contact" className="w-full h-full flex items-center justify-center">
                            <button 
                                className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                            >
                                Contact
                            </button>
                        </Link>
                        </Menu.Item>
                        { currentUser
                            ? 
                                <div className="w-full h-full">
                                    <Menu.Item>
                                        <Link to="/" className="w-full h-full flex items-center justify-center">
                                            <button 
                                                className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                                onClick={() => handleLogout() }
                                            >
                                                Logout
                                            </button>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/account" className="w-full h-full flex items-center justify-center">
                                            <button 
                                                className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                                            >
                                                Account
                                            </button>
                                        </Link>
                                    </Menu.Item>
                                </div>
                            :
                                <>
                                    <Menu.Item>
                                        <Link to="/login" className="w-full h-full flex items-center justify-center">
                                            <button 
                                                className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                            >
                                                Login
                                            </button>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/signup" className="w-full h-full flex items-center justify-center">
                                            <button 
                                                className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                                            >
                                                Sign Up
                                            </button>
                                        </Link>
                                    </Menu.Item>
                                </>
                        }
                    </Menu.Items>
                </Transition>
            </Menu>
            
            </div>
    </div>
    );
};


const AccountNavBar = () => {
    const logo = require('../../assets/Logo.jpg');
    const setActiveUser = ChatStore(state => state.actions.setCurrentUser);

    const [ alreadyUser, setAlreadyUser ] = useState(false);

    const { refetch: refetchLogout } = trpc.auth.logout.useQuery({}, { 
        enabled: false, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000,
        onSuccess: (data) => {
            setActiveUser(null);
        }
    });

    trpc.auth.checkUser.useQuery({}, { 
        enabled: true, 
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 10000,
        onSuccess: () => {
            setAlreadyUser(true);
        },
        onError: () => {
            setAlreadyUser(false);
        }
    });

    const handleLogout = () => {
        refetchLogout();
        setAlreadyUser(false);
    }

    return (
        <div className="sticky top-0 flex w-full h-[60px] justify-between z-50 bg-white shadow-lg shadow-accent/20 border border-accent/10">
            <div className="xs:hidden md:flex w-full h-full">
                <DeskTopView logo={logo} currentUser={alreadyUser} handleLogout={handleLogout}/>
            </div>
            <div className="xs:flex md:hidden w-full h-full">
                <MobileView logo={logo} currentUser={alreadyUser} handleLogout={handleLogout}/>
            </div>
        </div>
    )
}

export default AccountNavBar