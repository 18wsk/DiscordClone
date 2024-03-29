import { Link } from 'react-router-dom'
import PasswordInput from '../components/ReUsable/PasswordInput'
import {motion} from "framer-motion";
import { useState } from 'react';
import FormInput from '../components/ReUsable/FormInput';
import DateOfBirth from '../components/ReUsable/DateOfBirth';
import { trpc } from '../utils/trpc';
import { type Birthday } from '../../../server/src/types/Birthday';
import { TailSpin } from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatStore from '../store';
import { FaUserAstronaut } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';



const SignUpPage = () => {
    const [password, setPassword] = useState<string | null>(null);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [email, setEmail] = useState<string | null>(null);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [username, setUsername] = useState<string | null>(null);
    const [userNameValid, setUsernameValid] = useState<boolean>(true);
    const [dob, setDob] = useState<Birthday>({day: null, month: null, year: null});
    const [userPfp, setUserPfp] = useState<string | null>(null);
    const setDateOfBirth = ({name, value}: {name: string, value: string | number | null}) => { 
        setDob({...dob, [name]: value});
    }
    const [dobValid, setDobValid] = useState<boolean>(true);
    
    const useCreateUser = trpc.auth.signup.useMutation();

    const logo = require('../assets/logo.png');

    const isValidEmail = () => {
        const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email?.match(regex)) {
            return true;
        }
        return false;
    };

    const isValidBirthday = ({ year, month, day}: {year: string | number, month: string, day: string | number}): boolean => {
        const currentDate = new Date();
        const birthday = new Date(`${year}-${month}-${day}`);
        if (
          isNaN(birthday.getTime()) || // Invalid date
          birthday.getFullYear() !== +year || // Year mismatch
          birthday.getMonth() !== getMonthIndex(month) || // Month mismatch
          birthday.getDate() !== +day || // Day mismatch
          birthday > currentDate // Future date
        ) {
            return false;
        }
            return true;
        };

        const getMonthIndex = (month: string): number => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        
        return months.findIndex((m) => m.toLowerCase() === month.toLowerCase());
    };

    const isValidPassword = () => {
        /*
         * Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        */
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password?.match(regex)) {
            return true;
        }
        return false;
    }

    const validateFields = () => {
        // reset flags to prevent overlap of error messages
        setEmailValid(true);
        setUsernameValid(true);
        setPasswordValid(true);
        setDobValid(true);
        if (email === null || email.length === 0) {
            setEmailValid(false);
            handleValidationErrors("Email is required.");
            return false;
        }
        else if (!isValidEmail()) {
            setEmailValid(false);
            handleValidationErrors("Invalid email format.");
        }
        else if (username === null || username.length === 0) {
            setUsernameValid(false);
            handleValidationErrors("Username is required.");
            return false;
        }
        else if (password === null || password.length === 0) {
            setPasswordValid(false);
            handleValidationErrors("Password is required.");
            return false;
        }
        else if (!isValidPassword()) {
            setPasswordValid(false);
            handleValidationErrors("Invalid password format.");
        }
        else if (dob.day === (null) || dob.day === ("day") || dob.month === (null) || dob.month === ("month") || dob.year === (null) || dob.year === ("year") ) {
            setDobValid(false);
            handleValidationErrors("Valid Date of Birth is required.");
            return false;
        }
        // else if (!isValidBirthday({year: dob?.year, month: dob?.month as string, day: dob?.day})) {
        //     setDobValid(false);
        //     handleValidationErrors("Please enter a valid date of birth.");
        // }
        else if (userPfp === null) {
            handleValidationErrors("Please enter a profile picture");
            return false
        }
        else {
            return true;
        }
    };

    const handleValidationErrors = (error: string | null) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    
    const setActiveUser = ChatStore(state => state.actions.setCurrentUser);
    const [loading, setLoading] = useState<boolean>(false);


    const handleSignUp = async (event: any) => {
        event.preventDefault();
        if (validateFields() ) {
            setLoading(true);
            await useCreateUser.mutateAsync(
                {
                    email: email!, 
                    password: password!, 
                    userName: username!, 
                    birthday: dob.day + "/" + dob.month + "/" + dob.year,
                    pfp: userPfp,
                    status: false
                },
                {
                    onSuccess: (data) => {
                        setLoading(false);
                        setActiveUser(data);
                        toast.success("You have successfully created an account!", {
                            position: "top-right",
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
                        setLoading(false);
                        toast.error(error.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        if (error.message === "Email already registered to another account.") setEmailValid(false);
                        if (error.message === "Username taken.") setUsernameValid(false);
                    },
                }
            );
        }
    };

    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file && file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
            reader.onload = async () => {
                if (reader.result) {
                    setUserPfp(reader.result as string);
                }
            };
        } else {
            toast.error("Please select an image file.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div 
            className="w-screen h-screen overflow-auto scrollbar-hide bg-secondary"
        >
            <div className="sticky top-0 flex w-full h-[60px] justify-between z-50 bg-tertiary shadow-lg shadow-accent/20 border border-accent/10">
                <div className='h-full w-full flex items-center justify-start pl-2'>
                    <Link to="/" className="h-full flex items-center justify-center ">
                            <img src={logo} alt="logo" className="h-2/3 w-[160px] aspect-video" />
                    </Link>
                </div>
                <div className='h-full w-full flex items-center justify-end pr-2'>
                    <Link to="/login" className="w-fit h-full flex items-center justify-end">
                        <button 
                            className="flex items-center justify-center text-white bg-accent text-center w-24 p-1 rounded-lg  hover:bg-accent-hover"
                        >
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <motion.div 
                className="min-h-full w-full flex flex-col items-center justify-center fixed xs:pb-10 "
                initial={{ opacity: 0,  y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8 }}
            >
                <div className="xs:w-4/5 sm:w-full sm:mx-auto sm:max-w-lg rounded-md shadow-2xl shadow-accent/60 sm:p-8 xs:px-4 bg-tertiary">
                    <div>
                        <h1 className="md:text-_2xl xs:text-_2xl text-accent font-bold text-center pt-4">Create an account</h1>
                        <h1 className="md:text-sm xs:text-xs text-white text-center md:pb-4 xs:pb-2">Welcome to our community.</h1>
                    </div>
                    <div className="w-full h-fit flex items-center justify-center">
                        {
                            userPfp === null ? (
                                <>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        className="pfp-input "
                                        onChange={(e) => handleFileInputChange(e)}
                                    />
                                    <label htmlFor="file-input" className="pfp-input-label ">
                                        <FaUserAstronaut className="pfp-input-icon" fill={"#ffffff"} />
                                    </label>
                                </>
                                ) : (
                                    <img
                                        src={userPfp ?? ""}
                                        alt="GG"
                                        className='h-[80px] w-[80px] rounded-full object-cover'
                                        onClick={() => {setUserPfp(null)}}
                                    />
                            )
                        }
                        <div className="h-[80px] w-fit relative bg-green-300">
                            <div className="absolute right-2 bottom-0 bg-accent h-5 w-5 rounded-full text-white flex flex-col items-center justify-center border border-white">
                                <BiEditAlt className="h-4 w-4"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-white xs:py-1 font-semibold sm:text-sm xs:text-xs">Upload Profile Picture</h2>
                    </div>
                    <h2 className="text-white xs:py-1 font-semibold sm:text-sm xs:text-xs">EMAIL:</h2>
                        <FormInput value={email} onInputChange={setEmail} valid={emailValid}/>
                    <h2 className="text-white xs:py-1 font-semibold sm:text-sm xs:text-xs ">USERNAME:</h2>
                        <FormInput value={username} onInputChange={setUsername} valid={userNameValid} maxChar={15}/>
                    <h2 className="text-white xs:py-1 font-semibold sm:text-sm xs:text-xs flex items-center gap-x-2">PASSWORD:</h2>
                        <PasswordInput value={password} onInputChange={setPassword} passwordValid={passwordValid}/>
                        <p className="text-white font-light sm:text-xs xs:text-_2xs py-1">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    <h2 className="text-white xs:py-1 font-semibold sm:text-sm xs:text-xs">DATE OF BIRTH:</h2>
                    <div className='xs:py-1'>
                        <DateOfBirth dobValid={dobValid} setDateOfBirth={setDateOfBirth} dob={dob}/>
                    </div>
                    <div className="w-full h-fit flex justify-center md:pt-12 xs:py-4">
                        <button 
                            className="xs:h-[32px] sm:text-md xs:text-sm w-max-[440px] bg-accent hover:bg-accent-hover rounded-md flex items-center 
                            justify-center text-white font-bold text-center w-full h-[36px] sm:p-1 xs:px-1x shadow-md shadow-accent/50 
                            hover:shadow-accent-hover/50"
                            onClick={handleSignUp}
                        >
                            {loading ? <TailSpin  stroke="#FFFFFF" speed={.75}  className="text-white flex items-center justify-center p-2"/> : "Sign Up"}
                        </button>
                    </div>
                    <div className="text-black text-center sm:py-4 xs:pb-4 flex-0 w-min-full text-bold">
                        <Link to="/login" className="text-accent hover:underline sm:text-sm xs:text-xs">Already have an account?</Link>
                    </div>
                </div>
            </motion.div>
            <div>
                <ToastContainer limit={1}/>
            </div>
        </div>
    )
}

export default SignUpPage