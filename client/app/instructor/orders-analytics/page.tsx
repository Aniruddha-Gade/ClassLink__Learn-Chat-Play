import React from 'react';
import InstructorSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";
import OrderAnalytics from "../../components/Instructor/Analytics/OrderAnalytics";
import { cookies } from "next/headers";
import axios from "axios";


type Props = {}




// SSR function
async function fetchOrdersAnalytics() {
    const cookieStore = await cookies(); // Access cookies
    const refreshToken = cookieStore.get("refresh_token")?.value; // Retrieve refresh token
    const accessToken = cookieStore.get("access_token")?.value; // Retrieve Access token

    if (!refreshToken || !accessToken) {
        throw new Error("Unauthorized: Refresh/Access Token is missing");
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/analytics/get-orders-analytics`,
            {
                headers: {
                    "Authorization-Access": `Bearer ${accessToken}`, // Custom header for access token
                    "Authorization-Refresh": `Bearer ${refreshToken}`, // Custom header for refresh token
                },
            }
        );
        return response?.data?.orders
    } catch (error: any) {
        console.log('Error while fecthing orders analytics 🔴🔴 = ', error)
        return []
    }
}



const page = async (props: Props) => {

    // const ordesrData = await fetchOrdersAnalytics()

    const ordersData = [
        { month: "Jan 2023", count: 440 },
        { month: "Feb 2023", count: 8200 },
        { month: "March 2023", count: 4033 },
        { month: "April 2023", count: 4502 },
        { month: "May 2023", count: 2042 },
        { month: "June 2023", count: 3454 },
        { month: "July 2023", count: 356 },
        { month: "Aug 2023", count: 5667 },
        { month: "Sept 2023", count: 1320 },
        { month: "Oct 2023", count: 6526 },
        { month: "Nov 2023", count: 5480 },
        { month: "Dec 2023", count: 485 },
    ];

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

                    <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>ORDERS ANALYTICS</div>

                    <OrderAnalytics orderAnalyticsData={ordersData} />
                </div>
            </div>
        </div>
    );
};

export default page;
