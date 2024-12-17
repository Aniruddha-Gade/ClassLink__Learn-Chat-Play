import React from 'react';
import InstructorSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";
import CourseAnalytics from "../../components/Instructor/Analytics/CourseAnalytics";
import { cookies } from "next/headers";
import axios from "axios";


type Props = {}




// SSR function
async function fetchCoursesAnalytics() {
    const cookieStore = await cookies(); // Access cookies
    const refreshToken = cookieStore.get("refresh_token")?.value; // Retrieve refresh token
    const accessToken = cookieStore.get("access_token")?.value; // Retrieve Access token

    if (!refreshToken || !accessToken) {
        throw new Error("Unauthorized: Refresh/Access Token is missing");
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/analytics/get-courses-analytics`,
            {
                headers: {
                    "Authorization-Access": `Bearer ${accessToken}`, // Custom header for access token
                    "Authorization-Refresh": `Bearer ${refreshToken}`, // Custom header for refresh token
                },
            }
        );
        return response?.data?.courses
    } catch (error: any) {
        console.log('Error while fecthing course  data 🔴🔴 = ', error)
        return []
    }
}




const page =async (props: Props) => {

    const courseAnalytics = await fetchCoursesAnalytics()
    const courseAnalyticsData = courseAnalytics.map((item: any) => ({
        name: item.month,
        uv: item.count,
    }));

    return (
        <div>
            <Heading
                title="ClassLink - Instructor Analytics"
                description="ClassLink is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />

            <div className="flex min-h-screen ">
                <div className="1500px:w-[16%] w-1/5">
                    <InstructorSidebar />
                </div>

                <div className="w-[85%] h-full">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>COURSES ANALYTICS</div>

                    <CourseAnalytics courseAnalyticsData={courseAnalyticsData} />
                </div>
            </div>
        </div>
    );
};

export default page;
