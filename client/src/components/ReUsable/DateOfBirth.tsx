import { Listbox } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import clsx from 'clsx';
import { type Birthday } from '../../../../server/src/types/Birthday';

const DateOfBirth = ({ 
        dobValid,
        setDateOfBirth,
        dob
    }: {
        setDateOfBirth: ({name, value}: {name: string, value: string | number | null}) => void,
        dobValid: boolean,
        dob: Birthday
    }) => {

    const MonthSelect = () => {
        const options = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <Listbox
                value={dob.month} 
                onChange={(val) => setDateOfBirth({name: "month", value: val})}
                name={"month"}
            >
                {({ open }) => (
                    <>
                        <div className="relative sm:w-[100px] h-[36px] xs:w-[80px] bg-secondary rounded-md shadow-md">
                            <Listbox.Button className={clsx(
                                "w-full h-full flex sm:text-sm xs:text-xs bg-secondary rounded-md", 
                                open && "rounded-md ",
                                !dobValid && "border-red-500"
                            )}>
                                <div className="w-full h-full flex items-center justify-center text-center text-white">
                                    {dob.month ? dob.month : "Month"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown fill={"white"}/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options 
                                className={`${open ? 'block' : 'hidden'} text-white absolute right-0 left-0 sm:w-[100px] xs:w-[80px] -translate-y-[218px] 
                                        bg-secondary max-h-[180px] overflow-auto scrollbar-hide rounded-md scroll-smooth`
                                }>
                                {options.map((m) => (
                                    <Listbox.Option
                                        key={m}
                                        value={m}
                                        className={"sm:w-[100px] h-[36px] xs:w-[80px] flex items-center justify-center sm:text-sm xs:text-xs"}
                                    >
                                        {m}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </>
                )}
            </Listbox>
        )
    }

    const DaySelect = () => {
        const dayOptions = Array.from({length: 31}, (_, i) => (1 + i).toString());
        return (
            <Listbox
                value={dob.day} 
                onChange={(val) => setDateOfBirth({name: "day", value: val})}
                name={"day"}
            >
                {({ open }) => (
                    <>
                        <div className="relative sm:w-[100px] h-[36px] xs:w-[80px] bg-secondary rounded-md shadow-md">
                            <Listbox.Button className={clsx(
                                "w-full h-full flex sm:text-sm xs:text-xs bg-secondary rounded-md", 
                                open && "rounded-md ", 
                                !dobValid && "border-red-500"
                            )}>
                            <div className="w-full h-full flex items-center justify-center text-center text-white">
                                    {dob.day ? dob.day : "Day"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown  fill={"#FFFFFF"}/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options
                                className={`${open ? 'block' : 'hidden'} text-white absolute right-0 left-0 sm:w-[100px] xs:w-[80px] -translate-y-[218px] 
                                        bg-secondary  max-h-[180px] overflow-auto scrollbar-hide rounded-md scroll-smooth`
                                }>
                                {dayOptions.map((d) => (
                                    <Listbox.Option
                                        key={d}
                                        value={d}
                                        className={"sm:w-[100px] h-[36px] xs:w-[80px] flex items-center justify-center sm:text-sm xs:text-xs"}
                                    >
                                        {d}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </>
                )}
            </Listbox>
        )
    }

    const YearSelect = () => {
        const yearOptions = Array.from({length: 153}, (_, i) => (2023 - i).toString());
        return (
            <Listbox
                value={dob.year} 
                onChange={(val) => setDateOfBirth({name: "year", value: val})}
                name={"year"}
            >
                {({ open }) => (
                    <>
                        <div className="relative sm:w-[100px] h-[36px] xs:w-[80px] bg-secondary rounded-md shadow-md">
                            <Listbox.Button className={clsx(
                                "w-full h-full flex sm:text-sm xs:text-xs bg-secondary rounded-md", 
                                open && "rounded-md ", 
                                !dobValid && "border-red-500"
                            )}>
                                <div className="w-full h-full flex items-center justify-center text-center text-white">
                                    {dob.year ? dob.year : "Year"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown fill={"#FFFFFF"}/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options 
                                className={`${open ? 'block' : 'hidden'} text-white absolute right-0 left-0 sm:w-[100px] xs:w-[80px] -translate-y-[218px] 
                                        bg-secondary max-h-[180px] overflow-auto scrollbar-hide rounded-md scroll-smooth`
                                }>
                                {yearOptions.reverse().map((d) => (
                                    <Listbox.Option
                                        key={d}
                                        value={d}
                                        className={"sm:w-[100px] h-[36px] xs:w-[80px]  flex items-center justify-center sm:text-sm xs:text-xs"}
                                    >
                                        {d}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </>
                )}
            </Listbox>
        )
    }

    return (
        <div className="w-max-[440px] xs:max-w-2/3 h-full flex sm:justify-around xs:justify-around xs:px-2">
            <MonthSelect/>
            <DaySelect/>
            <YearSelect/>
        </div>
    )
}

export default DateOfBirth;