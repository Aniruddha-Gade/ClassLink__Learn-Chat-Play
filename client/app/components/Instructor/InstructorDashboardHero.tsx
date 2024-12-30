

import InstructorDashboardHeader from "./InstructorDashboardHeader"
import UserAnalytics from "./Analytics/UserAnalytics";
import OrderAnalytics from "./Analytics/OrderAnalytics";
import CourseAnalytics from "./Analytics/CourseAnalytics";

const InstructorDashboardHero = () => {

    // temporary data
    const usersData = [
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

    const courseData = [
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
        <div className=''>
            <InstructorDashboardHeader />

            <div className='mt-24 flex flex-col md:flex-row gap-8 md:gap-5 px-5 w-full flex-center justify-between '>
                <div className='bg-[#F6F7F9] dark:bg-[#282C35] rounded-2xl p-5 w-full h-full '>
                    <UserAnalytics usersAnalyticsData={usersData} isDashboard={true} />
                </div>
                <div className='bg-[#F6F7F9] dark:bg-[#282C35] rounded-2xl p-5 w-full h-full '>
                    <CourseAnalytics courseAnalyticsData={courseData} isDashboard={true} />
                </div>
            </div>
            <div className=''>
                <OrderAnalytics orderAnalyticsData={ordersData} />
            </div>

        </div>
    )
}

export default InstructorDashboardHero