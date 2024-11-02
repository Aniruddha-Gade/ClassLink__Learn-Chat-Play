'use client'

import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'


interface Props {

}

const CreateCourse: React.FC<Props> = () => {

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
    });

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ]);

    // main data will store here
    const [courseData, setCourseData] = useState({})

    // handle Submit course
    const handleSubmit = async () => {
        // format benefits
        const formatedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        // format prerequisites
        const formatedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))

        // format course content array
        const formatedCourseContentData = courseContentData.map((courseContent) => (
            {
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoSection: courseContent.videoSection,
                links: courseContent.links.map((link) => (
                    {
                        title: link.title,
                        url: link.url,
                    }
                )),
                suggestion: courseContent.suggestion,

            }
        ))

        // prepare course data to send server
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideos: courseContentData.length,
            benefits: formatedBenefits,
            prerequisites: formatedPrerequisites,
            courseContent: formatedCourseContentData
        }

        setCourseData(data)
    }

    console.log("Final courseData = ", courseData)

    // handle Create Course
    const handleCreateCourse = async()=>{

    }

    return (
        <div className='w-full flex min-h-screen pb-20'>
            <div className='w-[80%] '>
                {
                    active === 0 && <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 1 && <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 2 && <CourseContent
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        active={active}
                        setActive={setActive}
                        handleSubmit={handleSubmit}
                    />
                }
                {
                    active === 3 && <CoursePreview
                        courseData={courseData}
                        active={active}
                        setActive={setActive}
                        handleCreateCourse={handleCreateCourse}
                    />
                }
            </div>

            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 '>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse
