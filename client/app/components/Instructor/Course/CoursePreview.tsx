import React from 'react'
import CoursePlayer from "../../../utils/CoursePlayer"
import { styles } from '../../../styles/style'
import Ratings from "../../../utils/Ratings"
import { Button } from "../../ui/button"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import FlowersRain from "../../../utils/FlowersRain"


interface Props {
    isEdit?: boolean;
    courseData: any,
    active: number,
    setActive: (active: number) => void,
    isLoadingCreateCourse: boolean,
    isSuccessCreateCourse: boolean,
    handleCreateCourse: any
}


const CoursePreview: React.FC<Props> = ({ isEdit, courseData, active, setActive, handleCreateCourse, isLoadingCreateCourse, isSuccessCreateCourse }) => {

    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;

    const discountPercentagePrice = discountPercentage.toFixed(0);


    const prevButton = () => {
        setActive(active - 1)
    }

    const createCourse = () => {
        handleCreateCourse()
    }



    return (
        <div className='w-[90%] m-autp py-5 pl-10 mb-5 text-black dark:text-white'>

            {isSuccessCreateCourse && <FlowersRain />}


            <div className='w-full relative'>
                <div className='w-full mt-10'>
                    <CoursePlayer
                        videoUrl={courseData.demoUrl}
                        title={courseData.title}
                    />
                </div>

                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "₹"}
                    </h1>

                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        {courseData?.estimatedPrice}₹
                    </h5>

                    <h4 className="pl-5 pt-4 text-[22px]">
                        {discountPercentagePrice}% Off
                    </h4>
                </div>

                <div className="flex items-center">
                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins text-white !bg-[crimson] !cursor-not-allowed `}>
                        Buy Now {courseData?.price}
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type='text'
                        name=''
                        id=''
                        placeholder='Discount code...'
                        className={`${styles.input} 1100px:w-[60%] 1500px:w-[50%] ml-3 !mt-0 `}
                    />
                    <div className={`${styles.button} !w-[120px] my-3 ml-4 text-white !bg-[crimson] cursor-pointer `}>
                        Apply
                    </div>
                </div>

                <p className="pb-1">• Source code included</p>
                <p className="pb-1">• Full Lifetime access</p>
                <p className="pb-1">• Certificate of completion</p>
                <p className="pb-3 800px:pb-1">• Premium Support</p>


                <div className="w-full 800px:pr-5">
                    <div className="w-full">
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            {courseData?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={0} />
                                <h5>0 Reviews</h5>
                            </div>
                        </div>
                        <h5>0 Students</h5>
                    </div>


                    <h1 className='mt-5 text-[25px] font-[600] font-Poppins '>
                        What you will learn from this course...?
                    </h1>
                </div>


                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}


                <h1 className="mt-9 text-[25px] font-Poppins font-[600]">
                    What are the prerequisites for starting this course?
                </h1>

                {courseData?.prerequisites?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}


                {/* course description */}
                <div className="mt-9 w-full">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px) whitespace-pre-line w-full overflow-hidden">
                        {courseData?.description}
                    </p>
                </div>
            </div>



            {/* previous btn / create btn */}
            <div className="w-full flex-between">
                <Button
                    onClick={() => prevButton()}
                    value="previous"
                    disabled={isLoadingCreateCourse}
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    Previous
                </Button>

                <Button
                    onClick={() => createCourse()}
                    value="Create"
                    disabled={isLoadingCreateCourse}
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    {isLoadingCreateCourse ? 'Loading...!' : isEdit ? "Update" : 'Create'}
                </Button>
            </div>

        </div>
    )
}

export default CoursePreview
