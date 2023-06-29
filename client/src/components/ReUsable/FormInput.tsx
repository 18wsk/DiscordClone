import clsx from "clsx";
import { useState } from "react"

const FormInput = ({
    value,
    onInputChange,
    valid=true
}:
{
    valid: boolean,
    value: string | null,
    onInputChange: (value: string) => void,
}) => {
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <div 
            className={
                clsx(
                    "w-full flex items-center bg-secondary rounded-md shadow-md ", 
                    inputFocused && "border-accent/60 outline-none shadow-accent/60",
                    !valid && "border-red-500"
                )
            }
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            >
            <input 
                className="text-white w-full h-full xs:px-1 xs:py-1 sm:px-2 sm:py-2 bg-secondary rounded-md outline-none focus:outline-none"
                type={"email"}
                value={value || ""}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </div>
    )
}

export default FormInput;