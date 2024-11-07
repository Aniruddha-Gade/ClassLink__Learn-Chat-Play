"use client";

import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import React, { FC } from "react";
import Image from 'next/image';
import UserDropdownMenu from '../../utils/UserDropdownMenu'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"




type Props = {};

const DashboardHeader: FC<Props> = () => {


    return (
        <div className="flex items-center justify-end gap-3 px-6 fixed top-3 right-0">
            <ThemeSwitcher />

            <UserDropdownMenu/>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="relative cursor-pointer m-2">
                        <Image
                            src='/assets/icons/notification-icon.png'
                            className="cursor-pointer object-contain w-7 h-7 "
                            width={30}
                            height={30}
                            alt="Profile Icon"
                        />
                        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                            3
                        </span>
                    </div>
                </DropdownMenuTrigger>


                <DropdownMenuContent className='w-[300px] h-[500px] rounded-2xl border-2 duration-300 mr-7'>
                    <DropdownMenuLabel className='text-center text-[20px] font-Poppins text-black dark:text-white p-3'>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                        <div>
                            <div className="w-full flex items-center justify-between ">
                                <p className="text-black dark:text-white">New Question Received</p>
                                <p className="cursor-pointer text-green-600">Mark as read</p>
                            </div>
                            <p className="text-black dark:text-white">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, sequi! Tempore libero omnis et, ea beatae ut, itaque
                            </p>
                            <p className=" text-black dark:text-white text-[14px]">
                                5 days ago
                            </p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                        <div>
                            <div className="w-full flex items-center justify-between ">
                                <p className="text-black dark:text-white">New Question Received</p>
                                <p className="cursor-pointer text-green-600">Mark as read</p>
                            </div>
                            <p className="text-black dark:text-white">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, sequi! Tempore libero omnis et, ea beatae ut, itaque
                            </p>
                            <p className="text-black dark:text-white text-[14px]">
                                5 days ago
                            </p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    );
};

export default DashboardHeader;
