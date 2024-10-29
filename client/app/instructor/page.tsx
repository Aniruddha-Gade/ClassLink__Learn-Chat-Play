

import React from 'react';
import Heading from '../utils/Heading';
import InstructorProtected from '../hooks/instructorProtected';
import InstructorDashboardHero from "../components/Instructor/InstructorDashboardHero"
import InstructorSidebar from '../components/Instructor/sidebar/InstructorSidebar';



const page = () => {


  return (
    <div>
      <InstructorProtected>
        <Heading
          title="ClassLink - Instructor"
          description="ClassLink is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />


        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <InstructorSidebar />
          </div>


          <div className="w-[85%]">
            <InstructorDashboardHero />
          </div>
        </div>

      </InstructorProtected>
    </div>
  );
};

export default page;
