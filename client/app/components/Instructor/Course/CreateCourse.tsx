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

    const [active, setActive] = useState(3);
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
    // const [courseData, setCourseData] = useState({})
    const [courseData, setCourseData] = useState({
        "name": "g",
        "description": "g",
        "price": "499",
        "estimatedPrice": "899",
        "tags": "4",
        "level": "4",
        "demoUrl": "eda19a4be4cfe2cf85330bffbe203132",
        "thumbnail": "data:image/png;base64,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",
        "totalVideos": 1,
        "benefits": [
            {
                "title": "k"
            }
        ],
        "prerequisites": [
            {
                "title": "k"
            }
        ],
        "courseContent": [
            {
                "videoUrl": "k",
                "title": "k",
                "description": "k",
                "videoSection": "Untitled Section",
                "links": [
                    {
                        "title": "k",
                        "url": "k"
                    }
                ],
                "suggestion": ""
            }
        ]
    })

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
