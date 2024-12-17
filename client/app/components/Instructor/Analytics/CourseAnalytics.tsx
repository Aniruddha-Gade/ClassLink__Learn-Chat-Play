'use client'


import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, LabelList, } from 'recharts';
import { styles } from '../../../styles/style'

type Props = {
    courseAnalyticsData: {
        name:string,
        uv:string
    }[]
};



const CourseAnalytics:React.FC<Props> =  ({courseAnalyticsData}) => {

    const minValue = 0
    console.log(' courseAnalyticsData', courseAnalyticsData)

    return (
        <div className="h-screen">
            <div className="mt-[50px]">
                {/* <h1 className={`${styles.title} px-5 !text-start`}>Courses Analytics</h1> */}
            </div>

            <div className="w-full h-[90%] flex flex-col items-center justify-center">
                <ResponsiveContainer width="90%" height="50%">
                    <BarChart width={150} height={300} data={courseAnalyticsData}>
                        <XAxis dataKey="name">
                            <Label offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis domain={[minValue, "auto"]} />
                        <Bar dataKey="uv" fill="#3faf82">
                            <LabelList dataKey="uv" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <p className={`${styles.label} px-5 mt-3`}>Last 12 months analytics data</p>
            </div>
        </div>
    );
};

export default CourseAnalytics;