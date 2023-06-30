import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import clsx from 'clsx';

export const MobileView = ({
    logo,
    currentUser,
    handleLogout,
    handleSectionClick,
    activeSection
}:{
    logo: string,
    currentUser:  boolean ,
    handleLogout: () => void,
    handleSectionClick: (section: string) => void,
    activeSection: string
}) => {

    return(
        <div className='w-full h-full flex jusitfy-between relative'>
            <div className='h-full w-full flex items-center justify-start'>
                <Link to="/" className="h-full flex items-center justify-center pl-2">
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
                        <Menu.Items className="absolute top-[28px] right-0 bg-primary w-screen shadow-lg shadow-accent/20 border-b broder-l border-r border-accent/10 pb-4">
                            <Menu.Item>
                            <div className="w-full h-full flex items-center justify-center">
                                <button 
                                    className={clsx(
                                        "flex items-center justify-center text-center w-24 p-1 rounded-lg", 
                                        activeSection === "Home" && 'text-white bg-accent-hover/10',
                                        activeSection !== "Home" && 'text-white hover:text-white hover:bg-accent-hover/10'
                                    )}
                                    onClick={() => {
                                        handleSectionClick("Home");
                                    }}
                                >
                                    Home
                                </button>
                            </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="w-full h-full flex items-center justify-center">
                                    <button 
                                        className={clsx(
                                            "flex items-center justify-center text-center w-24 p-1 rounded-lg", 
                                            activeSection === "Product" && 'text-white bg-accent-hover/10',
                                            activeSection !== "Product" && 'text-white hover:text-white hover:bg-accent-hover/10'
                                        )}
                                        onClick={() => {
                                            handleSectionClick("Product");
                                        }}
                                    >
                                        Product
                                    </button>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="w-full h-full flex items-center justify-center">
                                    <button 
                                        className={clsx(
                                            "flex items-center justify-center text-center w-24 p-1 rounded-lg", 
                                            activeSection === "About" && 'text-white bg-accent-hover/10',
                                            activeSection !== "About" && 'text-white hover:text-white hover:bg-accent-hover/10'
                                        )}
                                        onClick={() => {
                                            handleSectionClick("About");
                                        }}
                                    >
                                        About
                                    </button>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="w-full h-full flex items-center justify-center">
                                    <button 
                                        className={clsx(
                                            "flex items-center justify-center text-center w-24 p-1 rounded-lg", 
                                            activeSection === "Contact" && 'text-white bg-accent-hover/10',
                                            activeSection !== "Contact" && 'text-white hover:text-white hover:bg-accent-hover/10'
                                        )}
                                        onClick={() => {
                                            handleSectionClick("Contact");
                                        }}
                                    >
                                        Contact
                                    </button>
                                </div>
                            </Menu.Item>
                            { currentUser
                                ? 
                                    <div className="w-full h-full">
                                        <Menu.Item>
                                            <Link to="/" className="w-full h-full flex items-center justify-center">
                                                <button 
                                                    className="flex items-center justify-center text-white text-center w-24 p-1 hover:text-white rounded-lg  hover:bg-accent-hover/10"
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
                                                    className="flex items-center justify-center text-white text-center w-24 p-1 hover:text-white rounded-lg  hover:bg-accent-hover/10"
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