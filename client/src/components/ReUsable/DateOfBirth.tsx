import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'

const DateOfBirth = () => {
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null);

    const MonthSelect = () => {
        const options = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <Listbox
                value={month} 
                onChange={setMonth}
                name={"month"}
            >
                {({ open }) => (
                    <>
                        <div className="relative w-[120px] h-[36px] bg-white rounded-md shadow-md border-2">
                            <Listbox.Button className="w-full h-full flex text-sm">
                                <div className="w-full h-full flex items-center justify-center text-center">
                                    {month ? month : "Month"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options className={`${open ? 'block' : 'hidden'}  absolute left-0 bg-gray-200 max-h-[180px] overflow-auto scrollbar-hide rounded-md`}>
                                {options.map((m) => (
                                    <Listbox.Option
                                        key={m}
                                        value={m}
                                        className={"w-[120px] h-[36px] border hover:border-accent/50 flex items-center justify-center text-sm"}
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
        const dayOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        return (
            <Listbox
                value={day} 
                onChange={setDay}
                name={"day"}
            >
                {({ open }) => (
                    <>
                        <div className="relative w-[100px] h-[36px] bg-white rounded-md shadow-md border-2">
                            <Listbox.Button className="w-full h-full flex text-sm">
                                <div className="w-full h-full flex items-center justify-center text-center">
                                    {day ? day : "Day"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options className={`${open ? 'block' : 'hidden'}  absolute left-0 bg-gray-200 max-h-[180px] overflow-auto scrollbar-hide rounded-md`}>
                                {dayOptions.map((d) => (
                                    <Listbox.Option
                                        key={d}
                                        value={d}
                                        className={"w-[100px] h-[36px] border hover:border-accent/50 flex items-center justify-center text-sm"}
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
                value={year} 
                onChange={setYear}
                name={"year"}
            >
                {({ open }) => (
                    <>
                        <div className="relative w-[100px] h-[36px] bg-white rounded-md shadow-md border-2">
                            <Listbox.Button className="w-full h-full flex text-sm">
                                <div className="w-full h-full flex items-center justify-center text-center">
                                    {year ? year : "Year"}
                                </div>
                                <div className="w-[20px] h-full flex justify-center items-center">
                                    <FiChevronDown/>
                                </div>
                            </Listbox.Button>
                            <Listbox.Options className={`${open ? 'block' : 'hidden'} absolute left-0 bg-gray-200 max-h-[180px] overflow-auto scrollbar-hide rounded-md`}>
                                {yearOptions.reverse().map((d) => (
                                    <Listbox.Option
                                        key={d}
                                        value={d}
                                        className={"w-[100px] h-[36px] border hover:border-accent/50 flex items-center justify-center text-sm"}
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
        <div className="w-[440px] h-full flex justify-around">
            <MonthSelect/>
            <DaySelect/>
            <YearSelect/>
        </div>
    )
}

export default DateOfBirth;