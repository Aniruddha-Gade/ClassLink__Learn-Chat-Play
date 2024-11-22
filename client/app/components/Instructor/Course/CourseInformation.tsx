

import React, { useState } from 'react'
import { styles } from '../../../styles/style';
import AsteriskSymbol from '../../../utils/AsteriskSymbol';
import { Button } from "../../ui/button"
import Image from 'next/image'


interface Props {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}



const CourseInformation: React.FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {

    const [dragging, setDragging] = useState<boolean>(false)

    // handle Submit
    const handleSubmit = (e: any) => {
        e.preventDefault;
        setActive(active + 1)
    }

    // handle File Change
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // handle Drag Over
    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };

    // handle Drag Leave
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };

    // handle Drop
    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                {/* Course Name */}
                <div>
                    <label htmlFor="">Course Name <AsteriskSymbol /></label>
                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        id="name"
                        placeholder="MERN stack LMS platform with next 13"
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <br />


                {/* Course Description */}
                <div className="mb-5">
                    <label className={`${styles.label}`}>Course Description <AsteriskSymbol /></label>
                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={8}
                        placeholder="Write something amazing..."
                        className={`${styles.input} h-min py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                    ></textarea>
                </div>
                <br />


                {/* Course Price */}
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Course Price <AsteriskSymbol /></label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            id="price"
                            placeholder="2990"
                            className={`${styles.input}`}
                        />
                    </div>

                    {/* Estimated Price */}
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Estimated Price(optional) </label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            id="price"
                            placeholder="5990"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />

                {/* Course Tags */}
                <div>
                    <label className={`${styles.label}`} htmlFor="email">Course Tags <AsteriskSymbol /></label>
                    <input
                        type="text"
                        required
                        name=""
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        id="tags"
                        placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
                        className={`${styles.input}`}
                    />
                </div>
                <br />


                {/* Course Level */}
                <div className="w-full flex justify-between">
                    <div className="w-[30%]">
                        <label className={`${styles.label}`}>Course Level <AsteriskSymbol /></label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id="level"
                            placeholder="Beginner/Intermediate/Expert"
                            className={`${styles.input}`}
                        />
                    </div>

                    {/* Demo Url */}
                    <div className="w-[60%]">
                        <label className={`${styles.label} w-[50%]`}>Demo Url <AsteriskSymbol /></label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id="demoUrl"
                            placeholder="eer74fd"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />

                {/* upload file */}
                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file">
                        <div
                            className={`w-full min-h-[30vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center 
                                      cursor-pointer ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {courseInfo.thumbnail ? (
                                <Image
                                    src={courseInfo.thumbnail?.url ||courseInfo.thumbnail}
                                    width={100}
                                    height={100}
                                    className="max-h-full w-full object-cover"
                                    alt="Course Thumbnail"
                                />
                            ) : (
                                <div className="">
                                    <p className='text-black dark:text-white text-center mb-4'>Drag and drop your thumbnail here or click to browse</p>
                                    <Image
                                        src='/assets/images/drag-and-drop.jpg'
                                        width={900}
                                        height={900}
                                        className="max-h-full w-full object-cover"
                                        alt="Course Thumbnail"
                                    />
                                </div>
                            )}
                        </div>
                    </label>
                </div>



                {/* next btn */}
                <div className="w-full flex items-center justify-end">
                    <Button
                        type='submit'
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    >
                        Next
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default CourseInformation
