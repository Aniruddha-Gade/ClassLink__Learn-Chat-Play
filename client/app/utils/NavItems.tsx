import Link from "next/link";
import { FC } from "react";
import {navItemsData}from '../constants/navbar'
import Image from "next/image";



type NavItemsProps = {
    isMobile: boolean;
    activeItem: number;
}


const NavItems: FC<NavItemsProps> = ({ isMobile, activeItem }) => {
    return (
        <>
            <div className="hidden 800px:flex w-full gap-2">
                {
                    navItemsData.map((item, index) => (
                        <Link
                            href={item.url}
                            key={item.name}
                            passHref
                        >
                            <span
                                className={`flex items-center gap-2 font-medium text-[18px] px-6 py-3 font-Poppins rounded-xl duration-200
                                    ${activeItem === index ? 'dark:bg-white/15 bg-green-600 text-white/100 dark:text-[#3ca337] text-[crimson]  '
                                        : 'dark:text-white/80 hover:text-white text-black hover:dark:bg-white/15 hover:dark:text-white hover:bg-green-600 '} `}
                            >
                                <Image
                                                className="cursor-pointer"
                                                src={item.icon}
                                                width={30}
                                                height={30}
                                                alt={`${item.name} icon`}
                                            />
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>

        </>
    )
}


export default NavItems
