import { Link } from 'react-router-dom'
import HomePageNavBar from '../components/Home/NavBar/HomePageNavBar'
import PageSection from '../components/ReUsable/PageSection'
import { motion } from 'framer-motion'

const HomePage = () => {
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
                <div className="w-full h-full pt-[70px] flex items-center justify-center" id="Product">
                    <div className="w-3/4 h-full grid grid-cols-2 items-center justify-center px-8 gap-x-8">
                    <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-2/3">
                                <h1 className="text-4xl font-bold text-white">Effortless communication: secure live-chat made easy.</h1>
                                <p className='w-full h-fit text-2xl text-white p-8'>
                                    Experience the future of real-time communication with our cutting-edge chat application. 
                                    With instant messaging powered by Socket.IO, professional-level security using cookies and 
                                    JWT tokens, type-safe API calls with TRPC, and a lightning-fast, responsive design optimized 
                                    by React Query, our app ensures seamless and secure conversations. Join us for a revolutionary 
                                    chat experience like no other.
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-2/3 bg-accent rounded-lg flex items-center justify-center shadow-2xl shadow-accent-hover">
                            </div>
                        </div>
                    </div>
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]" />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="About">
                    
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]" />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="Contact">
                    
                </div>
            </PageSection>
        </div>
    )
}

export default HomePage