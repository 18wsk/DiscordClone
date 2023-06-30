import { Link } from 'react-router-dom'
import PasswordInput from '../components/ReUsable/PasswordInput'
import {motion} from "framer-motion";
import { useState } from 'react';
import FormInput from '../components/ReUsable/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import { trpc } from '../utils/trpc';
import { TailSpin } from 'react-loading-icons';
import ChatStore from '../store';
import { Password } from '../../../server/src/types/Password';

const LoginPage = () => {
    const [password, setPassword] = useState<Password | null>({ password: null, iv: null });
    const [email, setEmail] = useState("");
    const logo = require('../assets/logo.png');

    const savePassword = (value: string) => {
        setPassword({
            password: value,
            iv: null
        });
    }

    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    
    const setActiveUser = ChatStore(state => state.actions.setCurrentUser);

    const loginQuery = trpc.auth.login.useQuery({email, password}, { 
        enabled: false, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000,
        onSuccess: (data) => {
            setActiveUser(data);
            toast.success("Login successful!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                window.location.href = "/account";
            }, 1000);
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            if (error.message === "Email not registered.") {
                setEmailValid(false);
            }
            else {
                setEmailValid(false);
                setPasswordValid(false);
            }
        }
    });

    const isValidEmail = () => {
        const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email?.match(regex)) {
            return true
        }
        return false
    };

    const validateFields = () => {
        // reset flags to prevent overlap of error messages
        setEmailValid(true);
        setPasswordValid(true);
        if (email === null || email.length === 0) {
            setEmailValid(false);
            handleValidationErrors("Email is required.");
            return false;
        }
        else if (!isValidEmail()) {
            setEmailValid(false);
            handleValidationErrors("Invalid email format.");
        }
        else if (password === null || password?.password?.length === 0) {
            setPasswordValid(false);
            handleValidationErrors("Password is required.");
            return false;
        }
        else {
            return true;
        }
    };

    const handleValidationErrors = (error: string | null) => {
        toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    
    const handleLogin = async (event: any) => {
        event.preventDefault();
        if (validateFields()) {
            await loginQuery.refetch();
        }
    };

    return (
        <div 
            className="w-screen h-screen overflow-hidden scrollbar-hide bg-primary"
        >
            <div className="sticky top-0 flex w-full h-[60px] justify-between z-50 bg-primary shadow-lg shadow-accent/20 border border-accent/10">
                <div className='h-full w-full flex items-center justify-start pl-2'>
                    <Link to="/" className="h-full flex items-center justify-center ">
                            <img src={logo} alt="logo" className="h-2/3 w-[160px] aspect-video" />
                    </Link>
                </div>
                <div className='h-full w-full flex items-center justify-end pr-2'>
                    <Link to="/signup" className="w-fit h-full flex items-center justify-end">
                        <button 
                            className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
            <motion.div 
                className="min-h-full w-full flex flex-col items-center justify-center"
                initial={{ opacity: 0,  y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8 }}
            >
                <div className="xs:w-4/5 sm:w-full sm:mx-auto sm:max-w-lg rounded-md shadow-2xl shadow-accent sm:p-8 xs:px-4 bg-tertiary">
                    <div>
                        <h1 className="md:text-2xl xs:text-xl text-accent font-bold text-center md:pt-10 xs:pt-4">Welcome back!</h1>
                        <h1 className="md:text-sm xs:text-xs text-white text-center md:pb-4 xs:pb-2">We are happy to see you again.</h1>
                    </div>
                    <h2 className="text-white sm:pt-8 sm:pb-2 xs:py-1 font-semibold sm:text-sm xs:text-xs flex items-center gap-x-2">EMAIL:</h2>
                        <FormInput value={email} onInputChange={setEmail} valid={emailValid}/>
                    <h2 className="text-white sm:pt-8 sm:pb-2 xs:py-1 font-semibold sm:text-sm xs:text-xs flex items-center gap-x-2">PASSWORD:</h2>
                        <PasswordInput value={password?.password ?? ""} onInputChange={savePassword} passwordValid={passwordValid}/>
                    <div className="w-full h-fit flex justify-center pt-12">
                        <button
                            type="submit"
                            className="xs:h-[32px] bg-accent hover:bg-accent-hover rounded-md flex items-center justify-center text-white font-bold text-center w-full h-[36px] p-1 shadow-lg shadow-accent/50 hover:shadow-accent-hover/50"
                            onClick={handleLogin}
                        >
                            {loginQuery.isFetching ? <TailSpin  stroke="#FFFFFF" speed={.75}  className="text-white flex items-center justify-center p-2"/> : "Sign In"}
                        </button>
                    </div>
                    <div>
                    <div className="text-white text-center py-10 flex-0 w-min-full text-bold sm:text-sm xs:text-xs ">
                        Don't have an account? <Link to="/signup" className="text-accent hover:underline sm:text-sm xs:text-xs">Sign Up</Link>
                    </div>
                </div>
                </div>
            </motion.div>
            <div>
                <ToastContainer limit={1}/>
            </div>
        </div>
    )
}

export default LoginPage