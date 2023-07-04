
import { motion } from "framer-motion";

const PageSection = ({ children }: { children: any}) => {
    return (
        <motion.div 
            className="w-full h-full flex items-center justify-center h-max-[850px]"
            initial={{ opacity: 0, y: -100 }}
            animate={{ y: 0, opacity: 1}}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    )
}

export default PageSection