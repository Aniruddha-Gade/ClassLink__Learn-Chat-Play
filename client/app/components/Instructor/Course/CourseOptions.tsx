

import React from 'react'
import Image from "next/image"

interface Props {
    active: number;
    setActive: (active: number) => void;
}


const CourseOptions: React.FC<Props> = ({ active, setActive }) => {

    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ]

    return (
        <div>
            {options.map((option: any, index: number) => (
                <div key={index} className="w-full flex py-4">
                    <div
                        className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active > index ? "bg-blue-500" : "bg-[#384766]"
                            } relative`}
                    >
                        {
                            active > index ? <Image
                                className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                src='/assets/icons/check-icon.png'
                                width={30}
                                height={30}
                                alt="Profile Icon"
                            />

                                :
                                <Image
                                    className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                    src='/assets/icons/check2-icon.png'
                                    width={30}
                                    height={30}
                                    alt="Profile Icon"
                                />
                        }

                        {index != options.length - 1 && (
                            <div
                                className={`absolute h-[33px] w-1 ${active > index ? "bg-blue-500" : "bg-[#384766]"
                                    } bottom-[-100%]`}
                            />
                        )}
                    </div>

                    <h5
                        className={`pl-3 ${active > index
                                ? "dark:text-white text-black"
                                : "dark:text-white text-black"
                            } text-[20px]`}
                    >
                        {option}
                    </h5>

                </div>
            ))}
        </div>
    );
}

export default CourseOptions
