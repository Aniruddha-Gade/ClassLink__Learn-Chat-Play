'use client'

import React, { useState } from 'react'
import { styles } from '../../../styles/style';
import Image from 'next/image'
import { Button } from "../../ui/button"
import { toast } from 'sonner'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"
import { BsPencil } from "react-icons/bs"

interface Props {
    courseContentData: any,
    setCourseContentData: (courseContentData: any) => void,
    active: number,
    setActive: (active: number) => void,
    handleSubmit: any
}

const CourseData: React.FC<Props> = ({ courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit, active, setActive }) => {

    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false))
    const [activeSection, setActiveSection] = useState<number>(1)


    // handle Submit
    const handleSubmit = (e: any) => {
        e.preventDefault()

    }

    // handle Collapse Toggle
    const handleCollapseToggle = (index: number) => {
        const updatedCollapse = [...isCollapsed]
        updatedCollapse[index] = !updatedCollapse[index]
        setIsCollapsed(updatedCollapse)
    }



    return (
        <div className="w-[80%] mt-24 p-3 m-auto ">
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <>
                                {showSectionInput && (
                                    <div className='flex-between w-full gap-3'>
                                        <input
                                            type="text"
                                            className={`text-[20px] w-full font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                            value={item.videoSection}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoSection = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                        <BsPencil className='cursor-pointer text-black dark:text-white' />
                                    </div>
                                )}


                                <div
                                    key={index}
                                    className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}
                                >
                                    <div className='w-full my-0 flex-between'>
                                        {
                                            isCollapsed[index] ? (
                                                item.title ? (
                                                    <p className='font-Poppins text-black dark:text-white'>
                                                        {index + 1} . {item.title}
                                                    </p>
                                                ) : null
                                            ) : (
                                                <div>


                                                </div>
                                            )}

                                        {/* arrow button for collapsed video content */}
                                        <div className='flex items-center'>
                                            {/* <Image
                                                        onClick={()=>{
                                                            if(index > 0) {
                                                                const updatedData = [...courseContentData]
                                                                updatedData.splice(index, 1)
                                                                setCourseContentData(updatedData)
                                                            }
                                                        }}
                                                        src='/assets/icons/add-icon.png'
                                                        className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                                        width={30}
                                                        height={30}
                                                        alt="Add Icon"
                                                    /> */}


                                            <AiOutlineDelete
                                                className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updatedData = [...courseContentData];
                                                        updatedData.splice(index, 1);
                                                        setCourseContentData(updatedData);
                                                    }
                                                }}
                                            />


                                            {/* <Image
                                                        onClick={()=> handleCollapseToggle (index)}
                                                        src='/assets/icons/add-icon.png'
                                                        className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                                        width={30}
                                                        height={30}
                                                        alt="Add Icon"
                                                    /> */}


                                            <MdOutlineKeyboardArrowDown
                                                fontSize="large"
                                                className="dark:text-white text-black"
                                                style={{
                                                    transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>

                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className='my-3'>
                                                    <label className={styles.label} >Video Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Introduction to MERN Stack..."
                                                        className={styles.input}
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className={styles.label}>Video Url</label>
                                                    <input
                                                        type="text"
                                                        placeholder="https://mernstack.com/xyz34"
                                                        className={styles.input}
                                                        value={item.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        );
                    })}
            </form>


        </div>
    );

}

export default CourseData
