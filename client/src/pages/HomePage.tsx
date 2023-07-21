import { Link } from 'react-router-dom'
import HomePageNavBar from '../components/Home/NavBar/HomePageNavBar'
import PageSection from '../components/ReUsable/PageSection'
import { motion } from 'framer-motion'
import { AiOutlineDownload } from 'react-icons/ai'
import Socials from '../components/Home/Socials'
import Contact from '../components/Home/Contact'

const HomePage = () => {
    const productImg = require('../assets/product.png');
    const pfp =  require("../assets/will_pfp.jpg");
    const resume = require("../assets/William_Kennedy_Resume.pdf");
    return (
        <div className="w-screen h-screen overflow-auto scrollbar-hide bg-secondary">
            <HomePageNavBar />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="Home">
                    <div className="lg:w-[1100px] xs:w-full h-full flex flex-col items-center justify-center">
                            <div className="relative">
                                <motion.div 
                                    className="xs:text-4xl md:text-8xl font-bold text-white w-full text-center"
                                > Where Communities
                                </motion.div>
                                <div className="w-full h-fit flex flex-cols-2 items-center justify-center gap-x-2">
                                    <motion.div 
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                        className="w-fit xs:text-4xl md:text-8xl font-bold text-white text-end h-full"
                                    > Come
                                    </motion.div> 
                                    <motion.div 
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                        className="w-fit xs:text-4xl md:text-8xl font-bold text-white text-start"
                                    > Together.
                                    </motion.div> 
                                </div>
                            </div>
                            <h2 className="w-full sm:text-lg xs:text-sm text-center pt-10 pb-4 text-white/50">
                                Join our platform and Connect and Collaborate in Real-Time!
                            </h2>
                            <div className='pt-4'>
                                <Link to="/signup" className="w-full h-full flex items-center justify-center">
                                    <button 
                                        className="rounded-lg bg-accent text-white font-bold p-2 hover:bg-accent-hover shadow-2xl 
                                        shadow-accent/100"
                                    >
                                        Get Started
                                    </button>
                                </Link>
                            </div>                       
                    </div>
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]"/>
            <PageSection>
                <div className="w-full h-full flex flex-col items-center bg-primary relative pt-[70px]" id="Product">
                    <motion.div
                        whileInView={{ y: 0, opacity: 1 }}
                        initial={{ y: 100, opacity: 0 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            damping: 40,
                        }}
                        viewport={{ once: true }}
                        className=''
                    >
                        <h1 className="xs:text-lg xs:text-center sm:text-start md:text-3xl lg:text-5xl font-extrabold text-white px-8 text-start py-4">
                            Effortless communication: secure live-chat made easy.
                        </h1>
                        <div 
                            className="w-full h-full grid grid-auto-rows-2 lg:grid-rows-1 lg:grid-cols-2 items-center justify-center px-8 
                                        lg:gap-x-12 sm:gapy-y-8 xs:pb-12 md:pt-4"
                        >
                            <div className="w-full h-full xs:row-start-2 lg:col-start-1 lg:row-span-2 xs:pt-8 lg:pt-0 ">
                                <div className='w-full h-full flex flex-col items-start justify-center'>
                                    <div className="w-full h-fit border-l-2 border-accent">
                                        <p className='w-full h-fit xs:text-sm  lg:text-xl text-white px-4 whitespace-pre-line'>
                                            Experience the future of real-time communication with our cutting-edge chat application.
                                        </p>
                                        <p className='w-full h-fit xs:text-sm lg:text-xl text-white xs:pt-4 px-4 whitespace-pre-line'>
                                            With instant messaging powered by Socket.IO, professional-level security using cookies and 
                                            JWT tokens, type-safe API calls with TRPC, and a lightning-fast, responsive design optimized 
                                            by React Query, our app ensures seamless and secure conversations.
                                        </p>
                                        <p className='w-full h-fit xs:text-sm lg:text-xl text-white xs:pt-4 px-4 whitespace-pre-line'>
                                            Join us for a revolutionary chat experience like no other.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center xs:row-start-1 lg:col-start-2 lg:row-span-2 ">
                                <div className="w-full h-max-lg rounded-lg flex items-center justify-center">
                                    <img src={productImg} alt="Product" className="rounded-lg shadow-2xl shadow-accent-hover"></img>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]" />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="About">
                <div className='w-full h-full relative z-0 flex items-center justify-center'>
                    <div className='w-full h-full flex items-center justify-center'>
                        <motion.div
                            whileInView={{ y: 0, opacity: 1 }}
                            initial={{ y: 100, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                damping: 40,
                            }}
                            viewport={{ once: true }}
                            className='w-full h-full flex items-center justify-center relative'
                        >
                            <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4'>
                                <div className='w-full h-full grid grid-rows-4 gap-x-12'>
                                    <div className='row-span-3 lg:w-max xs:w-screen h-full grid place-items-center lg:grid-cols-2 lg:gap-x-12'>
                                        <div className='w-full h-full lg:pt-0 mx-auto'>
                                            <img 
                                                src={pfp} 
                                                alt="logo" 
                                                className='mx-auto flex shrink rounded-full border-solid border-4 border-my-blue 
                                                            xs:h-50 xs:w-60 lg:w-[480px] lg:h-[480px]'/>
                                        </div>
                                        <div className='w-max h-max whitespace-pre-line'> 
                                            <h1 className='lg:text-xl font-bold text-white pb-12 xs:hidden lg:block'>Hi, I'm</h1>
                                            <h1 
                                                className='xs:pt-4 sm:pt-12 lg:pt-0 sm:text-5xl xs:text-3xl font-bold text-white 
                                                            underline decoration-accent'
                                            >
                                                William Kennedy
                                            </h1>
                                            <div className='flex flex-col items-center pt-4'>
                                                <div className='w-max'>
                                                    <h1 
                                                        className="animate-typing overflow-hidden whitespace-nowrap border-r-4 
                                                                    border-r-white pr-5 text-xl text-white font-bold">
                                                        Full Stack Developer
                                                    </h1>
                                                </div>
                                                <div className='w-max xs:h-20 sm:h-40 flex items-center justify-center'>
                                                    <a 
                                                        className='w-max h-10 bg-accent text-white rounded-lg m-4 px-4 flex 
                                                                    items-center justify-center gap-x-2 font-bold hover:bg-blue-600' 
                                                                    target="_blank"
                                                                    href={resume} 
                                                                    download={resume.name} 
                                                                    rel="noreferrer"
                                                    >
                                                        {<AiOutlineDownload/>} Resume
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full h-20 lg:pt-30'>
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <Socials/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>     
                    </div>
                </div>
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]" />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="Contact">
                    <div className='w-full h-fit relative z-0' id="contact" >
                        <motion.div
                            whileInView={{ y: 0, opacity: 1 }}
                            initial={{ y: 100, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                damping: 40,
                            }}
                            viewport={{ once: true }}
                            className='w-full items-center justify-center lg:pt-10 xs:pt-0 relative xs:px-10'
                        >
                            <div className='w-full'>
                                <div className="w-full h-max xs:pt-4 lg:pt-0 justify-center ">
                                    <h1 className='lg:text-[4rem] text-5xl text-center pb-4 decoration-my-blue underline underline-offset-8 text-white 
                                                    font-bold decoration-accent'
                                    >
                                        Contact
                                    </h1>
                                </div>
                                <Contact/>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </PageSection>
        </div>
    )
}

export default HomePage