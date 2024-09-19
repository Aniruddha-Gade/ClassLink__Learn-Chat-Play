'use client'

import React, { useState } from 'react'
import { styles } from '../../styles/style';
import Image from 'next/image';
import Login from './Login'
import Signup from './Signup';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"



type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
    open: boolean;
}




const AuthModal: React.FC<Props> = ({ setRoute, setOpen, open }) => {

    const [tabValue, setTabValue] = useState('login')

    const onTabValueChange = (val: string) => {
        setTabValue(val)
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='h-[670px] w-full rounded-3xl sm:rounded-3xl '>
                <DialogHeader>
                    <DialogTitle>
                        <div className={`${styles.title} font-semibold flex items-center`}>
                            <p>
                                <span className='text-green-600'>{tabValue === 'login' ? 'Login With' : 'Join To'} </span>
                                ClassLink
                            </p>
                            <Image
                                className="object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                src='/assets/icons/classLink-logo.png'
                                width={26}
                                height={26}
                                alt="Profile Icon"
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <div>
                            {tabValue === 'login' ?
                                <p>Welcome back! Dive into learning, chatting, and playing with your instructors.</p>
                                :
                                <p>
                                    Welcome to ClassLink. Create your account today to access exclusive learning resources, interactive chats, and exciting games.
                                </p>
                            }
                        </div>
                    </DialogDescription>
                </DialogHeader>

                {/* two tabs - login / signup */}
                <div className='flex-center w-full '>
                    <Tabs className='w-full h-full' defaultValue='login' onValueChange={onTabValueChange}>
                        <TabsList className='bg-transparent w-full rounded-none'>
                            <div className='flex w-full bg-transparent'>
                                <TabsTrigger value="login"
                                    className='w-full data-[state=active]:bg-transparent text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:border-b-green-500 p-3 transition-all duration-300'
                                >
                                    login
                                </TabsTrigger>
                                <TabsTrigger value="signup"
                                    className='w-full data-[state=active]:bg-transparent  text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:border-b-green-500 p-3 transition-all duration-300'
                                >
                                    Signup
                                </TabsTrigger>
                            </div>
                        </TabsList>


                        {/* login content */}
                        <TabsContent className='flex flex-col gap-5 mt-10' value='login'  >
                            {/* login form */}
                            <Login setRoute={setRoute} setOpen={setOpen} />
                        </TabsContent>

                        {/* signup content */}
                        <TabsContent className='flex flex-col gap-5 ' value='signup'>
                            <Signup setRoute={setRoute} setOpen={setOpen} />
                        </TabsContent>
                    </Tabs>
                </div>


            </DialogContent >
        </Dialog>

    )
}

export default AuthModal
