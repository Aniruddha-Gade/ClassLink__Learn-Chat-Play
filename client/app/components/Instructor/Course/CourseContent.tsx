'use client'

import React, { useState } from 'react'
import { styles } from '../../../styles/style';
import { Button } from "../../ui/button"
import { toast } from 'sonner'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"
import { BsPencil, BsLink45Deg } from "react-icons/bs"
import { AiOutlinePlusCircle } from "react-icons/ai"



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


    // handle Remove Link
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };


    // handle Add Link
    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData]
        updatedData[index].links.push({ title: "", url: "" })
        setCourseContentData(updatedData);
    }


    // add New Section
    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1]?.title === "" ||
            courseContentData[courseContentData.length - 1]?.description === "" ||
            courseContentData[courseContentData.length - 1]?.videoUrl === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].title === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first to create new section !");
        }
        else {
            setActiveSection(activeSection + 1)
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };


    // prev Button
    const prevButton = () => {
        setActive(active - 1);
    };

    // handle Options
    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1]?.title === "" ||
            courseContentData[courseContentData.length - 1]?.description === "" ||
            courseContentData[courseContentData.length - 1]?.videoUrl === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].title === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].url === ""
        ) {
            toast.error("section can't be empty!");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };

    return (
        <div className="w-[80%] mt-24 p-3 m-auto">
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item?.videoSection !== courseContentData[index - 1]?.videoSection;

                        return (
                            <div
                                key={index}
                                className={`w-full bg-[#E7E7E7] dark:bg-[#cdc8c817] rounded-xl p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}
                            >
                                {showSectionInput && (
                                    <>
                                        <div className='flex-between w-full gap-3'>
                                            <input
                                                type="text"
                                                className={`text-[20px] w-full font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                value={item?.videoSection}
                                                // onChange={(e) => {
                                                //     const updatedData = [...courseContentData];
                                                //     updatedData[index].videoSection = e.target.value;
                                                //     setCourseContentData(updatedData);
                                                // }}
                                                onChange={(e:any) => {
                                                    // Create a new array with the updated value
                                                    const updatedData = courseContentData.map((content:any, i:number) =>
                                                      i === index ? { ...content, videoSection: e.target.value } : content
                                                    );
                                                
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                            <BsPencil className='cursor-pointer text-black dark:text-white' />
                                        </div>
                                    </>
                                )}

                                <div className='w-full my-0 flex-between'>
                                    {
                                        isCollapsed[index] ? (
                                            item.title ? (
                                                <p className='font-Poppins text-black dark:text-white'>
                                                    {index + 1} . {item.title}
                                                </p>
                                            ) : null
                                        ) : (
                                            <div></div>
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

                                {!isCollapsed[index] && (
                                    <>
                                        <div className='my-3'>
                                            <label className={styles.label} >Video Title</label>
                                            <input
                                                type="text"
                                                placeholder="Introduction to MERN Stack..."
                                                className={styles.input}
                                                value={item.title}
                                                // onChange={(e) => {
                                                //     const updatedData = [...courseContentData];
                                                //     updatedData[index].title = e.target.value;
                                                //     setCourseContentData(updatedData);
                                                // }}
                                                onChange={(e:any) => {
                                                    // Create a new array with the updated value
                                                    const updatedData = courseContentData.map((content:any, i:number) =>
                                                      i === index ? { ...content, title: e.target.value } : content
                                                    );
                                                
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
                                                onChange={(e:any) => {
                                                    // Create a new array with the updated value
                                                    const updatedData = courseContentData.map((content:any, i:number) =>
                                                      i === index ? { ...content, videoUrl: e.target.value } : content
                                                    );
                                                
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className={styles.label}>Video Description</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                placeholder="This is Description"
                                                className={`${styles.input} py-2 !h-min `}
                                                value={item.description}
                                                onChange={(e:any) => {
                                                    // Create a new copy of the `courseContentData` array
                                                    const updatedData = courseContentData.map((content:any, i:number) =>
                                                      i === index ? { ...content, description: e.target.value } : content
                                                    );
                                                  
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                        <br />


                                        {
                                            item?.links.map((link: any, linkIndex: number) => (
                                                <div className="mb-3 block" key={linkIndex}>
                                                    <div className="w-full flex items-center justify-between">
                                                        <label className={styles.label}>
                                                            Link {linkIndex + 1}
                                                        </label>
                                                        <AiOutlineDelete
                                                            className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-[20px]`}
                                                            onClick={() => (linkIndex === 0 ? null : handleRemoveLink(index, linkIndex))}
                                                        />
                                                    </div>

                                                    <input
                                                        type="text"
                                                        placeholder="Source Code... (Link title)"
                                                        className={styles.input}
                                                        value={link.title}
                                                        // onChange={(e) => {
                                                        //     const updatedData = [...courseContentData];
                                                        //     updatedData[index].links[linkIndex].title = e.target.value;
                                                        //     setCourseContentData(updatedData);
                                                        // }}
                                                        onChange={(e:any) => {
                                                            // Create a new array, ensuring immutability
                                                            const updatedData = courseContentData.map((content:any, i:number) =>
                                                              i === index
                                                                ? {
                                                                    ...content,
                                                                    links: content.links.map((link:any, j:number) =>
                                                                      j === linkIndex ? { ...link, title: e.target.value } : link
                                                                    ),
                                                                  }
                                                                : content
                                                            );
                                                          
                                                            // Update the state with the new array
                                                            setCourseContentData(updatedData);
                                                          }}
                                                          
                                                    />

                                                    <input
                                                        type="url"
                                                        placeholder="Source Code URL... (Link URL)"
                                                        className={`${styles.input} mt-6`}
                                                        value={link.url}
                                                        // onChange={(e) => {
                                                        //     const updatedData = [...courseContentData];
                                                        //     updatedData[index].links[linkIndex].url = e.target.value;
                                                        //     setCourseContentData(updatedData);
                                                        // }}
                                                        onChange={(e:any) => {
                                                            // Create a new array, ensuring immutability
                                                            const updatedData = courseContentData.map((content:any, i:number) =>
                                                              i === index
                                                                ? {
                                                                    ...content,
                                                                    links: content.links.map((link:any, j:number) =>
                                                                      j === linkIndex ? { ...link, url: e.target.value } : link
                                                                    ),
                                                                  }
                                                                : content
                                                            );
                                                          
                                                            // Update the state with the new array
                                                            setCourseContentData(updatedData);
                                                          }}
                                                          
                                                    />
                                                </div>
                                            ))}
                                        <br />

                                        <div className="inline-block mb-4">
                                            <p
                                                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                onClick={() => handleAddLink(index)}
                                            >
                                                <BsLink45Deg className="mr-2" /> Add Link
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}

                <br />
                <div className="flex items-center text-[20px] dark:text-white text-black cursor-pointer" onClick={() => addNewSection()}>
                    <AiOutlinePlusCircle className="mr-2" /> Add New Section
                </div>
            </form>



            {/* next btn */}
            <div className="w-full flex-between">
                <Button
                    onClick={() => prevButton()}
                    value="Next"
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    Previous
                </Button>

                <Button
                    onClick={() => handleOptions()}
                    type='submit'
                    value="Next"
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    Next
                </Button>
            </div>

        </div>
    );

}

export default CourseData
