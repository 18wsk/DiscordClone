
import { motion } from "framer-motion";

const PageSection = ({ children }: { children: any}) => {
    return (
        <motion.div 
            className="w-full h-[calc(100vh-60px)] flex items-center justify-center px-4 py-4 "
            initial={{ opacity: 0, y: -100 }}
            animate={{ y: 0, opacity: 1}}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    )
}

export default PageSection