'use client'

import React, { useState, useEffect } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi"
import { redirect } from 'next/navigation'
import { toast } from 'sonner';


interface Props {

}

const CreateCourse: React.FC<Props> = () => {

    const [createCourse, { isLoading: createCourseIsLoading, error: createCourseError, isSuccess: createCourseIsSuccess }] = useCreateCourseMutation()

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
    const [courseData, setCourseData] = useState({})
    // const [courseData, setCourseData] = useState({
    //     "name": "Mern Stack Bootcamp",
    //     "description": "This is bootcamp of MERN Satck",
    //     "price": "499",
    //     "estimatedPrice": "899",
    //     "tags": "4",
    //     "level": "4",
    //     "demoUrl": "eda19a4be4cfe2cf85330bffbe203132",
    //     "thumbnail": "data:image/png;base64",
    //     "totalVideos": 1,
    //     "benefits": [
    //         {
    //             "title": "k"
    //         }
    //     ],
    //     "prerequisites": [
    //         {
    //             "title": "k"
    //         }
    //     ],
    //     "courseContent": [
    //         {
    //             "videoUrl": "k",
    //             "title": "k",
    //             "description": "k",
    //             "videoSection": "Untitled Section",
    //             "links": [
    //                 {
    //                     "title": "k",
    //                     "url": "k"
    //                 }
    //             ],
    //             "suggestion": ""
    //         }
    //     ]
    // })


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
    const handleCreateCourse = async () => {
        const data = courseData
        await createCourse({ data })

    }



    useEffect(() => {
        if (createCourseIsSuccess) {
            toast.success("Course created successfully")
            redirect("/instructor/all-courses")
        }
        if (createCourseError) {
            if ("data" in createCourseError) {
                console.log("CREATE COURSE API ERROR => ", createCourseError)
                const errorData = createCourseError as any
                toast.error(errorData.data.message)
            }
        }
    }, [createCourseIsSuccess, createCourseError])

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
                        createCourseIsLoading={createCourseIsLoading}
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
