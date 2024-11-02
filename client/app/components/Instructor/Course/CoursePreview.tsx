import React from 'react'
import CoursePlayer from "../../../utils/CoursePlayer"

interface Props {
    courseData: any,
    active: number,
    setActive: (active: number) => void,
    handleCreateCourse: any
}

const CoursePreview: React.FC<Props> = ({ courseData, active, setActive, handleCreateCourse }) => {
    return (
        <div className='w-[90%] m-autp py-5 mb-5 '>
            <div className='w-full relative'>
                <div className='w-full mt-10'>
                <CoursePlayer
                videoUrl={courseData.demoUrl}
                title={courseData.title}
                />
                </div>

            </div>
        </div>
    )
} 

export default CoursePreview
