'use client'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SidebarProfile from "./SidebarProfile"
import { useLogoutQuery } from '../../../redux/features/auth/authApi'
import { signOut } from "next-auth/react"
import { toast } from 'sonner'
import ProfileInfo from './ProfileInfo' 


interface Props {

}

const Profile: React.FC<Props> = () => {

    const [scroll, setScroll] = useState(false)
    const { user } = useSelector((state: any) => state.auth)
    const [avatar, setAvatar] = useState(null)
    const [active, setActive] = useState(1)
    const [logout, setLogout] = useState(false)
    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false
    })


    const logoutHandler = async () => {
        console.log("clicked for logout")
        setLogout(true)
        await signOut()
        toast.success("Logout successfully")

    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                if (window.scrollY > 85) {
                    setScroll(true);
                } else {
                    setScroll(false);
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
        <div className="w-[85%] flex mx-auto min-h-screen">
            <div className={`sticky w-[100px] 800px:w-[250px] h-[450px] bg-slate-100 dark:bg-slate-900 bg-opacity-90 border border-[#0000001c] dark:border-[#ffffff1d] 
                             rounded-lg shadow-xl dark:shadow-md my-[80px] left-[30px] 
                             ${scroll ? "top-[120px]" : "top-[30px]"}`}
            >
                <SidebarProfile
                    user={user}
                    avatar={avatar}
                    active={active}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
              
            </div>

            {
                    active===1 && (
                      <div className='w-full h-full bg-transparent mt-[80px] '>
                          <ProfileInfo avatar={avatar} user={user} />
                      </div>
                    )

                }
        </div>
    )
}

export default Profile
