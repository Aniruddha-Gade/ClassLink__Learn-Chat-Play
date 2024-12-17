import React from 'react';
import InstructorSidebar from "../../components/Instructor/sidebar/InstructorSidebar";
import Heading from "../../utils/Heading";
import InstructorDashboardHeader from "../../components/Instructor/InstructorDashboardHeader";
import AllUsers from "../../components/Instructor/User/AllUsers";
import axios from 'axios';
import { cookies } from 'next/headers';


type Props = {}


async function fecthAllUsersByInstructorCourses() {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;
 
  if (!access_token || !refresh_token) {
    throw new Error('Unauthorized');
  }

  const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-all-users-by-instructor-courses`,
    { access_token, refresh_token },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}


const page = async (props: Props) => {

  let allUsers:any;

  try {
    allUsers = await fecthAllUsersByInstructorCourses();
  } catch (error:any) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <Heading
        title="ClassLink - All Students"
        description="ClassLink is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />

      <div className="flex min-h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <InstructorSidebar />
        </div>

        <div className="w-[85%] h-full">
          <InstructorDashboardHeader />

          <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>ALL STUDENTS</div>

          <AllUsers allUsers={allUsers} />

          <h1>Fetched Data</h1>
          <pre>{JSON.stringify(allUsers, null, 15)}</pre>


        </div>
      </div>
    </div>
  );
};

export default page;
