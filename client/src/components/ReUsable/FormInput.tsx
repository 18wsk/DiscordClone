import clsx from "clsx";
import { useState } from "react"

const FormInput = ({
    value,
    onInputChange,
    valid = true
}:
{
    value: string,
    onInputChange: (value: string) => void,
    valid?: boolean
}) => {
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <div 
            className={
                clsx(
                    "w-full flex items-center bg-white rounded-md shadow-md border-2", 
                    inputFocused && "border-accent/60 outline-none shadow-accent/60",
                    !valid && "border-red-500"
                )
            }
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            >
            <input 
                className="w-full h-full py-2 px-2 bg-white rounded-md outline-none focus:outline-none"
                type={"email"}
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </div>
    )
}

export default FormInput;