'use client'

import React, { useState } from 'react'
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { styles } from '../../styles/style';
import Image from 'next/image';
import Login from './Login'
import Signup from './Signup';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"



type Props = {

}


const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
})


const AuthModal: React.FC<Props> = () => {

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log({ email, password })
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik
    const [showPassword, setShowPassword] = useState(false)

    return (
        <DialogContent className='h-[670px] w-full '>
            <DialogHeader>
                <DialogTitle>
                    <p className={`${styles.title} flex items-center`}>
                        Login With ClassLink
                        <Image
                            className="object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                            src='/assets/icons/classLink-logo.png'
                            width={26}
                            height={26}
                            alt="Profile Icon"
                        />
                    </p>
                </DialogTitle>
                <DialogDescription>
                    Secure login with ClassLink
                </DialogDescription>
            </DialogHeader>


            <div className='flex-center w-full '>
                <Tabs className='w-full h-full' defaultValue='login'>
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
                        <Login />
                    </TabsContent>

                    {/* signup content */}
                    <TabsContent className='flex flex-col gap-5 ' value='signup'>
                        <Signup />
                    </TabsContent>
                </Tabs>
            </div>



        </DialogContent >

    )
}

export default AuthModal
