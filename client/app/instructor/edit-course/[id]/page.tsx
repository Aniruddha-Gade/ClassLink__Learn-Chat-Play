

import React from 'react';
import AdminSidebar from "../../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../../utils/Heading";
import CreateCourse from "../../../components/Instructor/Course/CreateCourse";
import InstructorDashboardHeader from "../../../components/Instructor/InstructorDashboardHeader";
import { Skeleton } from "../../../components/ui/skeleton";
import { cookies } from "next/headers";
import axios from "axios";

type Props = {}


// SSR function
async function fetchCourseData(id: string) {
    const cookieStore = await cookies(); // Access cookies
    const refreshToken = cookieStore.get("refresh_token")?.value; // Retrieve refresh token
    const accessToken = cookieStore.get("access_token")?.value; // Retrieve Access token

    if (!refreshToken || !accessToken) {
        throw new Error("Unauthorized: Refresh/Access Token is missing");
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/course/get-course-by-instructor/${id}`,
            {
                headers: {
                    "Authorization-Access": `Bearer ${accessToken}`, // Custom header for access token
                    "Authorization-Refresh": `Bearer ${refreshToken}`, // Custom header for refresh token
                },
            }
        );
        return response?.data?.course
    } catch (error: any) {
        console.log('Error while fecthing course data 🔴🔴 = ', error)
        return []
    }
}



const Page = async ({ params }: any) => {

    const id = params.id
    const course = await fetchCourseData(id)


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

                    <CreateCourse isEdit={true} course={course} />
                </div>
            </div>
        </div>
    );
};

export default Page;
