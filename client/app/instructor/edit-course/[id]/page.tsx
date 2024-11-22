'use client'

import React , {useEffect} from 'react';
import AdminSidebar from "../../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../../utils/Heading";
import CreateCourse from "../../../components/Instructor/Course/CreateCourse";
import InstructorDashboardHeader from "../../../components/Instructor/InstructorDashboardHeader";
import {useGetSingleCourseByInstructorQuery} from "../../../../redux/features/course/courseApi"


type Props = {}

const Page = ({params}:any) => {

    const id = params.id
    const {data, isSuccess, isLoading, error}=useGetSingleCourseByInstructorQuery({id})

    console.log("data = ", data)

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
                
                <div className="w-[85%]">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-20 mt-10'>
                        EDIT COURSE
                    </div>

                   {  isSuccess &&
                     <CreateCourse isEdit={true} course = {data?.course} />
                   }
                </div>
            </div>
        </div>
    );
};

export default Page;
