'use client'

import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import NavItems from '../utils/NavItems'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import MobileMenu from './../utils/MobileMenu';
import UserDropdownMenu from '../utils/UserDropdownMenu'
import { useSession } from 'next-auth/react'
import { useSocialAuthMutation } from '../../redux/features/auth/authApi';
import { useLogoutQuery } from '../../redux/features/auth/authApi'


type HeaderProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void
}

const Header: FC<HeaderProps> = ({ activeItem, open, route, setRoute, setOpen }) => {

    const [active, setActive] = useState(false)

    const { token, user } = useSelector((state: any) => state.auth)
    // console.log("token from header = ", token)
    const { data } = useSession()
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
    const [logout, setLogout] = useState(false)
    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false
    })


    useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({ email: data?.user?.email, name: data?.user?.name, avatar: data?.user?.image })
            }
        }

        if (data === null) {
            if (isSuccess) {
                toast.success("Login successfully by Social-Auth ")
            }
        }

        if (data === null) {
            setLogout(true)
        }
    }, [data, user, isSuccess, socialAuth])



    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                if (window.scrollY > 0) {
                    setActive(true);
                } else {
                    setActive(false);
                }
            };

            window.addEventListener("scroll", handleScroll);

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    return (
        <nav className='w-full relative '>
            <div className={`${active ? 'fixed top-0 left-0 dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:border-[#ffffff1c] shadow-xl transition duration-500 '
                : 'dark:border-[#ffffff1c] dark:shadow '} 
                w-full h-[80px] z-[80] border-b-2 border-b-[#1717173f]`}
            >
                <div className='w-[95%] 800px:w-[92%] h-full py-2 m-auto '>
                    <div className="flex-between h-full w-full ">
                        <div className=''>
                            <Link href="/" className='flex items-center gap-2 text-[20px] 800px:text-[25px] font-Poppins font-semibold text-black dark:text-white '>
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

                            {/* change theme */}
                            <ThemeSwitcher />


                            {/* profile photo + dropdown-menu / login-signup */}
                            {
                                token && user ? (
                                    <UserDropdownMenu />
                                )
                                    :
                                    (
                                        <Image
                                            className="cursor-pointer"
                                            src='/assets/icons/profile-icon.png'
                                            width={30}
                                            height={30}
                                            onClick={() => { setOpen(true); setRoute("auth") }}
                                            alt="Profile Icon"
                                        />
                                    )
                            }



                            {/* show menu only for mobile devices */}
                            <div className='800px:hidden flex items-center '>
                                <MobileMenu activeItem={activeItem} />
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Header