import clsx from "clsx";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
    value,
    onInputChange,
    passwordValid
}:
{
    passwordValid: boolean,
    value: string | null,
    onInputChange: (value: string) => void,
}) => {
    const [inputFocused, setInputFocused] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);

    const handlePasswordType = () => {
        if (!buttonPressed) {
            return "password";
        }
        return "text";
    };


    return (
        <div 
            className={
                clsx(
                    "w-full flex items-center bg-secondary rounded-md shadow-md xs:h-[32px] sm:h-[38px]", 
                    inputFocused && "border-accent/60 outline-none shadow-accent/60 ",
                    !passwordValid && "border-red-500"
                )
            }
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            >
            <input 
                className="w-full h-full xs:px-1 xs:py-1 sm:px-2 sm:py-2 bg-secondary rounded-md outline-none focus:outline-none my-auto text-white"
                type={handlePasswordType()}
                value={value || ""}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button 
                className="w-10 h-full xs:px-1 py-1 sm:px-2 rounded-md"
                onClick={() => setButtonPressed(!buttonPressed)}
            >
                {buttonPressed ? <AiOutlineEye size={20} color="#3e47c9"/> : <AiOutlineEyeInvisible size={20} color="#3e47c9"/>}
            </button>
        </div>
    )
}

export default PasswordInput