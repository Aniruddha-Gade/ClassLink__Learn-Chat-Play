import React from 'react';
import InstructorSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";
import AllCourses from "../../components/Instructor/Course/AllCourses";


type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title="ClassLink - Instructor"
                description="ClassLink is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />

            <div className="flex h-screen">
                <div className="1500px:w-[16%] w-1/5">
                    <InstructorSidebar />
                </div>
                
                <div className="w-[85%]">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-5xl font-bold ml-10 mt-10'>All Courses</div>
                  
                    <AllCourses/>
                </div>
            </div>
        </div>
    );
};

export default page;
