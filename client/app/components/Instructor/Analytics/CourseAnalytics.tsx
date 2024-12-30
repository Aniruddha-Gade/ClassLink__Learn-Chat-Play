'use client'


import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, LabelList, } from 'recharts';
import { styles } from '../../../styles/style'

type Props = {
    courseAnalyticsData: {
        month:string,
        count:number
    }[],
    isDashboard?:boolean
};



const CourseAnalytics:React.FC<Props> =  ({courseAnalyticsData, isDashboard}) => {

    const minValue = 0

    return (
        <div className={`${isDashboard ? 'h-[40vh]' :'h-screen' } flex-center flex-col `}>
            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'} >
                <BarChart width={150} height={300} data={courseAnalyticsData}>
                    <XAxis dataKey="month">
                            <Label offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[minValue, "auto"]} />
                    <Bar dataKey="count" fill="#3faf82">
                        <LabelList dataKey="count" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <p className={`${styles.label} px-5 mt-3`}>Last 12 months course data</p>
        </div>
    );
};

export default CourseAnalytics;