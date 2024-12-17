import React from 'react';
import InstructorSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";
import UserAnalytics from "../../components/Instructor/Analytics/UserAnalytics";
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
            `${process.env.NEXT_PUBLIC_SERVER_URL}/analytics/get-users-analytics`,
            {
                headers: {
                    "Authorization-Access": `Bearer ${accessToken}`, // Custom header for access token
                    "Authorization-Refresh": `Bearer ${refreshToken}`, // Custom header for refresh token
                },
            }
        );
        return response?.data?.users
    } catch (error: any) {
        console.log('Error while fecthing users data 🔴🔴 = ', error)
        return []
    }
}




const page =async (props: Props) => {

    // const usersAnalytics = await fetchCoursesAnalytics()

    // temporary data
    const analyticsData = [
        { month: "January 2023", count: 440 },
        { month: "February 2023", count: 8200 },
        { month: "March 2023", count: 4033 },
        { month: "April 2023", count: 4502 },
        { month: "May 2023", count: 2042 },
        { month: "June 2023", count: 3454 },
        { month: "July 2023", count: 356 },
        { month: "August 2023", count: 5667 },
        { month: "September 2023", count: 1320 },
        { month: "October 2023", count: 6526 },
        { month: "November 2023", count: 5480 },
        { month: "December 2023", count: 485 },
      ];

    return (
        <div>
            <Heading
                title="ClassLink - Instructor users Analytics"
                description="ClassLink is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />

            <div className="flex min-h-screen ">
                <div className="1500px:w-[16%] w-1/5">
                    <InstructorSidebar />
                </div>

                <div className="w-[85%] h-full">
                    <InstructorDashboardHeader />

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>USERS ANALYTICS</div>

                    <UserAnalytics usersAnalyticsData={analyticsData}  />
                </div>
            </div>
        </div>
    );
};

export default page;
