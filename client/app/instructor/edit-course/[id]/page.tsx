'use client'

import React, { useEffect } from 'react';
import AdminSidebar from "../../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../../utils/Heading";
import CreateCourse from "../../../components/Instructor/Course/CreateCourse";
import InstructorDashboardHeader from "../../../components/Instructor/InstructorDashboardHeader";
import { useGetSingleCourseByInstructorQuery } from "../../../../redux/features/course/courseApi"
import { Skeleton } from "../../../components/ui/skeleton";

type Props = {}


// Course Form Skeleton
const CourseFormSkeleton = () => {
    return (
        <div className="space-y-6 px-14 mt-10 pb-10">
            {/* Course Name */}
            <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-12 w-[70%]" />
            </div>

            {/* Course Description */}
            <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-20 w-[85%]" />
            </div>

            {/* Price and Estimated Price */}
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="flex-1">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>

            {/* Tags */}
            <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-12 w-[70%]" />
            </div>

            {/* Drag-and-Drop */}
            <div>
                <Skeleton className="h-6 w-60 mb-4" />
                <Skeleton className="h-64 w-full rounded-md" />
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
                <Skeleton className="h-12 w-32 rounded-md" />
            </div>
        </div>
    )
} 


const Page = ({ params }: any) => {

    const id = params.id
    const { data, isSuccess, isLoading, error } = useGetSingleCourseByInstructorQuery({ id })


    return (
        <div>
            <Heading
                title="ClassLink - Instructor"
                description="ClassLink is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />

            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>

                <div className="w-[85%] h-full-">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-20 mt-10'>
                        EDIT COURSE
                    </div>

                    {isLoading ? (
                        // Render Skeleton Loader
                        <CourseFormSkeleton />)
                         :
                        !isSuccess ?
                            (<div className='text-2xl text-bold text-center'>
                                {error?.data?.message}
                            </div>)
                            :
                            (
                                // Render component once the data is fetched
                                <CreateCourse isEdit={true} course={data?.course} />
                            )}
                </div>
            </div>
        </div>
    );
};

export default Page;
