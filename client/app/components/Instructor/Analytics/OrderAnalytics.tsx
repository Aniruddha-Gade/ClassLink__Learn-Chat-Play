'use client'


import React from 'react';
import {LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line,ResponsiveContainer,} from "recharts";
import { styles } from '../../../styles/style'

type Props = {
    orderAnalyticsData: {
        month:string,
        count:number
    }[]
};



const CourseAnalytics:React.FC<Props> =  ({orderAnalyticsData}) => {

    const minValue = 0

    return (
        <div className="h-screen">
        <div className="w-full h-[90%] flex flex-col items-center justify-center">
          <ResponsiveContainer width="90%" height="50%">
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
          <p className="px-5 mt-3 text-center text-gray-700">
            Last 12 months orders data
          </p>
        </div>
      </div>
    );
};

export default CourseAnalytics;