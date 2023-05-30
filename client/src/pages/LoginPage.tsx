import NavBar from '../components/ReUsable/NavBar'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/ReUsable/PasswordInput'
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import FormInput from '../components/ReUsable/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import { trpc } from '../utils/trpc';
import { TailSpin } from 'react-loading-icons';
import { TRPCClientError } from '@trpc/client';
import ChatStore from '../store';

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const loginQuery = trpc.login.useQuery({email, password}, { 
        enabled: false, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000, });

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
            setErrorMsg("Email is required.");
            return false;
        }
        else if (!isValidEmail()) {
            setEmailValid(false);
            setErrorMsg("Invalid email format.");
        }
        else if (password === null || password.length === 0) {
            setPasswordValid(false);
            setErrorMsg("Password is required.");
            return false;
        }
        else {
            setErrorMsg(null);
            return true;
        }
    };

    useEffect(() => {
        if (errorMsg!== null) {
            toast.error(errorMsg, {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [errorMsg]);

    const setActiveUser = ChatStore(state => state.actions.setCurrentUser)

    useEffect(() => {
        if (loginQuery.isSuccess) {
            toast.success("Login successful!", {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setActiveUser(loginQuery.data);
            setTimeout(() => {
                window.location.href = "/account";
            }, 1000);
        }
    }, [loginQuery.data, loginQuery.isSuccess, setActiveUser]);

    useEffect(() => {
        if (loginQuery.error) {
            setErrorMsg(loginQuery.error.message);
            if (loginQuery.error instanceof TRPCClientError) {
                if (loginQuery.error.message === "Email not registered.") {
                    setEmailValid(false);
                }
                else {
                    setEmailValid(false);
                    setPasswordValid(false);
                }
            }
        }
    }, [loginQuery.error])
    
    const handleLogin = async (event: any) => {
        event.preventDefault();
        if (validateFields()) {
            await loginQuery.refetch();
        }
    };

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
                <div className="xs:w-3/4 sm:w-full sm:mx-auto sm:max-w-lg rounded-md border-2 shadow-2xl shadow-accent/100 sm:p-8 xs:pt-8 xs:px-8">
                    <div>
                        <h1 className="md:text-2xl xs:text-xl text-accent font-bold text-center md:pt-10 xs:pt-4">Welcome back!</h1>
                        <h1 className="md:text-sm xs:text-xs text-black text-center md:pb-4 xs:pb-2">We are happy to see you again.</h1>
                        <div className="w-full h-[20px] flex items-center justify-center">
                            {loginQuery.isFetching && <TailSpin  stroke="#3e47c9" speed={.75} />}
                        </div>
                    </div>
                    <h2 className="text-black pt-8 pb-2 font-semibold text-sm">EMAIL:</h2>
                        <FormInput value={email} onInputChange={setEmail} valid={emailValid}/>
                    <h2 className="text-black pt-8 pb-2 font-semibold text-sm">PASSWORD:</h2>
                        <PasswordInput value={password} onInputChange={setPassword} passwordValid={passwordValid}/>
                    <div className="w-full h-content flex justify-center pt-12">
                        <button
                            type="submit"
                            className="bg-accent hover:bg-accent-hover rounded-md flex items-center justify-center text-white font-bold text-center w-full h-[36px] p-1 shadow-lg shadow-accent/50 hover:shadow-accent-hover/50"
                            onClick={handleLogin}
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
            <div>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default LoginPage