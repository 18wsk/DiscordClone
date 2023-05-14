import NavBar from '../components/ReUsable/NavBar'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/ReUsable/PasswordInput'
import {motion} from "framer-motion";
import { useState } from 'react';
import EmailInput from '../components/ReUsable/FormInput';

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [validEmail, setValidEmail] = useState(true);

    const checkValidEmail = () => {
        const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(regex)) {
            setValidEmail(true);
        }
        else {
            setValidEmail(false);
        }
    };


    const handleLogin = () => {
        // checkValidEmail();
    }

    return (
        <div 
            className="w-screen h-screen overflow-hidden scrollbar-hide bg-white"
        >
            <NavBar/>
            <motion.div 
                className="min-h-full w-full flex flex-col items-center justify-center"
                initial={{ opacity: 0,  y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8 }}
            >
                <div className="xs:w-3/4 sm:w-full sm:mx-auto sm:max-w-lg rounded-md border-2 shadow-2xl shadow-accent/100 p-8">
                    <div>
                        <h1 className="md:text-2xl xs:text-xl text-accent font-bold text-center md:pt-10 xs:pt-4">Welcome back!</h1>
                        <h1 className="md:text-sm xs:text-xs text-black text-center md:pb-4 xs:pb-2">We are happy to see you again.</h1>
                    </div>
                    <h2 className="text-black pt-8 pb-2 font-semibold text-sm">EMAIL:</h2>
                        <EmailInput value={email} onInputChange={setEmail} valid={validEmail}/>
                    <h2 className="text-black pt-8 pb-2 font-semibold text-sm">PASSWORD:</h2>
                        <PasswordInput value={password} onInputChange={setPassword}/>
                    <div className="w-full h-content flex justify-center pt-12">
                        <button 
                            className="bg-accent hover:bg-accent-hover rounded-md flex items-center justify-center text-white font-bold text-center w-full h-[36px] p-1 shadow-lg shadow-accent/50 hover:shadow-accent-hover/50"
                            onClick={() => handleLogin()}
                        >
                            Sign In
                        </button>
                    </div>
                    <div>
                    <div className="text-black text-center py-10 flex-0 w-min-full text-bold">
                        Don't have an account? <Link to="/signup" className="text-accent hover:underline">Sign Up</Link>
                    </div>
                </div>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginPage