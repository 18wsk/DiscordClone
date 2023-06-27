import { Link } from 'react-router-dom'
import HomePageNavBar from '../components/Home/NavBar/HomePageNavBar'
import PageSection from '../components/ReUsable/PageSection'
import { motion } from 'framer-motion'

const HomePage = () => {
    return (
        <div className="w-screen h-screen overflow-auto scrollbar-hide bg-primary">
            <HomePageNavBar />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="Home">
                    <div className="lg:w-[1100px] xs:w-full h-full flex flex-col items-center justify-center">
                            <div className="relative">
                                <motion.div 
                                    className="xs:text-4xl md:text-8xl font-bold text-black w-full text-center"
                                > Where Communities
                                </motion.div>
                                <div className="w-full h-fit flex flex-cols-2 items-center justify-center gap-x-2">
                                    <motion.div 
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                        className="w-fit xs:text-4xl md:text-8xl font-bold text-black text-end h-full"
                                    > Come
                                    </motion.div> 
                                    <motion.div 
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                        className="w-fit xs:text-4xl md:text-8xl font-bold text-accent text-start"
                                    > Together.
                                    </motion.div> 
                                </div>
                            </div>
                            <h2 className="w-full sm:text-lg xs:text-sm text-center pt-10 pb-4 text-black/50">Join our platform and Connect and Collaborate in Real-Time!</h2>
                            <div className='pt-4'>
                                <Link to="/signup" className="w-full h-full flex items-center justify-center">
                                    <button className="rounded-lg bg-accent text-white font-bold p-2 hover:bg-accent-hover shadow-2xl shadow-accent/100">Get Started</button>
                                </Link>
                            </div>                       
                    </div>
                </div>
            </PageSection>
            <div className="bg-header flex items-center justify-center w-full xs:h-[200px] md:h-[300px]"/>
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center" id="Product">
                    
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