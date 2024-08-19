'use client'

import React, { FC, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import NavItems from '../utils/NavItems'



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
        <div className='w-full relative'>
            <div className={`${active ? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0  dark:border-[#ffffff1c] shadow-xl transition duration-500 '
                : 'dark:border-[#ffffff1c] dark:shadow '} 
                w-full h-[80px] z-[80] border-b`}
            >
                <div className='w-[95%] 800px:w-[92%] h-full py-2 m-auto '>
                    <div className="flex-between p-3 w-full ">
                        <div>
                            <Link href="/" className='text-[25px] font-Poppins font-medium text-black dark:text-white '>
                                ClassLink
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <NavItems
                                isMobile={false}
                                activeItem={activeItem}
                            />
                          
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Header