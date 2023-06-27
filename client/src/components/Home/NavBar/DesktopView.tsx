import { Link } from "react-router-dom";
import { NavButton } from "./NavButton";

export const DeskTopView = ({
    logo,
    currentUser,
    handleLogout,
    handleSectionClick,
    activeSection
}:{
    logo: string,
    currentUser:  boolean,
    handleLogout: () => void,
    handleSectionClick: (section: string) => void,
    activeSection: string
}) => {

    return (
        <div className='h-full w-full flex items-center'>
                <div className='h-full w-1/4 max-w-[300px] pl-2 flex items-center justify-start'>
                    <Link to="/" className="h-full flex items-center justify-center ">
                            <img src={logo} alt="logo" className="h-2/3 w-[160px] aspect-auto" />
                    </Link>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-1/2 h-full flex items-center justify-around'>
                        <div className="w-full h-full flex items-center justify-center">
                            <NavButton 
                                id="Home"
                                handleSectionClick={handleSectionClick}
                                activeSection={activeSection}
                            />
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <NavButton 
                                id="Product"
                                handleSectionClick={handleSectionClick}
                                activeSection={activeSection}
                            />
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <NavButton 
                                id="About"
                                handleSectionClick={handleSectionClick}
                                activeSection={activeSection}
                            />
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <NavButton 
                                id="Contact"
                                handleSectionClick={handleSectionClick}
                                activeSection={activeSection}
                            />
                        </div>
                        { currentUser
                            ? 
                                <>
                                    <Link to="/" className="w-full h-full flex items-center justify-center">
                                        <button 
                                            className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                            onClick={() => handleLogout() }
                                        >
                                            Logout
                                        </button>
                                    </Link>
                                </>
                            :
                                <>
                                    <Link to="/login" className="w-full h-full flex items-center justify-center">
                                        <button 
                                            className="flex items-center justify-center text-black text-center w-24 p-1 hover:text-accent rounded-lg  hover:bg-accent-hover/10"
                                        >
                                            Login
                                        </button>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
                <div className="w-1/4 h-full flex items-center justify-end pr-2">
                    { currentUser
                        ? 
                            <>
                                <Link to="/account" className="w-full h-full flex items-center justify-end">
                                    <button 
                                        className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                                    >
                                        Account
                                    </button>
                                </Link>
                            </>
                        :
                            <>
                                <Link to="/signup" className="w-fit h-full flex items-center justify-end">
                                    <button 
                                        className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                    }
                    </div>
            </div>
    )
};
