import clsx from "clsx";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
    value,
    onInputChange
}:
{
    value: string,
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
                    "w-full flex items-center bg-white rounded-md shadow-md border-2", 
                    inputFocused && "border-accent/60 outline-none shadow-accent/60 "
                )
            }
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            >
            <input 
                className="w-full h-full py-2 px-2 bg-white rounded-md outline-none focus:outline-none"
                type={handlePasswordType()}
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button 
                className="w-10 h-full py-1 px-2 rounded-md"
                onClick={() => setButtonPressed(!buttonPressed)}
            >
                {buttonPressed ? <AiOutlineEye size={20} color="#3e47c9"/> : <AiOutlineEyeInvisible size={20} color="#3e47c9"/>}
            </button>
        </div>
    )
}

export default PasswordInput