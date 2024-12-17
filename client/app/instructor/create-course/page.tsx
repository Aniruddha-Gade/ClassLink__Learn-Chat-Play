import React from 'react';
import AdminSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/Instructor/Course/CreateCourse";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";



type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title="ClassLink - Instructor"
                description="ClassLink is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />

            <div className="flex  min-h-screen ">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                
                <div className="w-[85%] h-full">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-20 mt-10'>
                        CREATE NEW COURSE
                    </div>

                    <CreateCourse />
                </div>
            </div>
        </div>
    );
};

export default page;
