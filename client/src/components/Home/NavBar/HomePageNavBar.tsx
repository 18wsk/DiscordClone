import ChatStore from '../../../store';
import { trpc } from '../../../utils/trpc';
import { useState } from 'react';
import { DeskTopView } from './DesktopView';
import { MobileView } from './MobileView';


const HomePageNavBar = () => {
    const logo = require('../../../assets/logo.png');
    const setActiveUser = ChatStore(state => state.actions.setCurrentUser);
    const [ activeSection, setActiveSection ] = useState('home');

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        document.getElementById(section)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

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
        setActiveSection('home');
    }

    return (
        <div className="sticky top-0 flex w-full h-[60px] justify-between z-50 bg-primary shadow-lg shadow-accent/20 border border-accent/10">
            <div className="xs:hidden md:flex w-full h-full">
                <DeskTopView logo={logo} currentUser={alreadyUser} handleLogout={handleLogout} handleSectionClick={handleSectionClick} activeSection={activeSection}/>
            </div>
            <div className="xs:flex md:hidden w-full h-full">
                <MobileView logo={logo} currentUser={alreadyUser} handleLogout={handleLogout} handleSectionClick={handleSectionClick} activeSection={activeSection}/>
            </div>
        </div>
    )
}

export default HomePageNavBar