'use client'


import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import { styles } from '../../../styles/style'

type Props = {
    usersAnalyticsData: {
        month: string,
        count: number
    }[],
    isAdminDashboard?: boolean
};



const UserAnalytics: React.FC<Props> = ({ usersAnalyticsData, isAdminDashboard }) => {


    return (
        <div className={`w-full ${isAdminDashboard ? 'h-[30vh]' : 'h-screen'} flex flex-col items-center justify-center`}>

            <ResponsiveContainer width={isAdminDashboard ? '100%' : '90%'} height={!isAdminDashboard ? "50%" : '100%'}>
                <AreaChart
                    data={usersAnalyticsData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#4d62d9"
                        fill="#4d62d9"
                    />
                </AreaChart>
            </ResponsiveContainer>

            <p className={`${styles.label} px-5 mt-3`}>Last 12 months analytics data</p>
        </div>
    );
};

export default UserAnalytics;