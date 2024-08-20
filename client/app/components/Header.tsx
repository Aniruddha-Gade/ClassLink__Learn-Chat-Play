'use client'

import React, { FC, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import NavItems from '../utils/NavItems'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import MobileMenu from './../utils/MobileMenu';


type HeaderProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}

const Header: FC<HeaderProps> = ({ activeItem }) => {

    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    if (typeof window !== undefined) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true)
            }
            else {
                setActive(false)
            }
        })
    }

    return (
        <div className='w-full relative '>
            <div className={`${active ? 'fixed top-0 left-0 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:border-[#ffffff1c] shadow-xl transition duration-500 '
                : 'dark:border-[#ffffff1c] dark:shadow '} 
                w-full h-[80px] z-[80] border-b-2 border-b-[#1717173f] `}
            >
                <div className='w-[95%] 800px:w-[92%] h-full py-2 m-auto '>
                    <div className="flex-between h-full w-full ">
                        <div className=''>
                            <Link href="/" className='flex items-center gap-2 text-[20px] 800px:text-[25px] font-Poppins font-medium text-black dark:text-white '>
                                ClassLink
                                <Image
                                    className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                    src='/assets/icons/classLink-logo.png'
                                    width={30}
                                    height={30}
                                    alt="Profile Icon"
                                />

                            </Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <NavItems
                                isMobile={false}
                                activeItem={activeItem}
                            />
                            <ThemeSwitcher />
                            {/* profile */}
                            <Image
                                className="cursor-pointer"
                                src='/assets/icons/profile-icon.png'
                                width={30}
                                height={30}
                                alt="Profile Icon"
                            />



                            {/* show only for mobile devices */}
                            <div className='800px:hidden'>
                                <MobileMenu activeItem={activeItem} />
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Header