'use client'


import React from 'react';
import {LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line,ResponsiveContainer,} from "recharts";
import { styles } from '../../../styles/style'

type Props = {
    orderAnalyticsData: {
        month:string,
        count:number
    }[],
    isDashboard?:true
};



const CourseAnalytics:React.FC<Props> =  ({orderAnalyticsData, isDashboard}) => {


    return (
        <div className={`${isDashboard ? 'h-[30vh]' : 'h-screen'} flex-center flex-col `}>
          <ResponsiveContainer width={isDashboard ? '50%' : '90%'} height={!isDashboard ? "50%" : '100%'} >
            <LineChart
              width={500}
              height={300}
              data={orderAnalyticsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <p className="px-5 mt-3 text-center ">
            Last 12 months orders data
          </p>
      </div>
    );
};

export default CourseAnalytics;