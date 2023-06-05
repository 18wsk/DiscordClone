import { Link } from 'react-router-dom'
import NavBar from '../components/ReUsable/NavBar'
import PageSection from '../components/ReUsable/PageSection'
import { motion } from 'framer-motion'

const HomePage = () => {
    return (
        <div className="w-screen h-screen overflow-auto scrollbar-hide bg-white">
            <NavBar />
            <PageSection>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="lg:w-[1100px] xs:w-full h-full flex flex-col items-center justify-center">
                            <div className="relative">
                                <motion.div 
                                    className="xs:text-4xl md:text-8xl font-bold text-black w-full text-center"
                                > Where Consumers and
                                </motion.div>
                                <motion.div 
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", delay: 0.5 }}
                                    className="xs:text-4xl md:text-8xl font-bold text-black w-1/2 text-end h-full"
                                > Brands
                                </motion.div> 
                                <motion.div 
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: "spring", delay: 0.5 }}
                                    className="xs:text-4xl md:text-8xl font-bold text-accent w-1/2 absolute bottom-0 right-0 text-left xs:pl-2 sm:pl-4"
                                > Collide.
                                </motion.div> 
                            </div>
                            <h2 className="w-full sm:text-lg xs:text-sm text-center pt-10 pb-4 text-black/50">Join our platform and win exclusive prizes while forging strong brand-consumer relationships</h2>
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
                <div className="w-full h-full flex flex-col items-center justify-center">
                    
                </div>
            </PageSection>
        </div>
    )
}

export default HomePage