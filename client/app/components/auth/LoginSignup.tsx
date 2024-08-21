'use client'

import React, { useState } from 'react'
import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { styles } from '../../styles/style';
import Image from 'next/image';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"


type Props = {

}


const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
})


const LoginSignup: React.FC<Props> = () => {

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
        <DialogContent>
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

            <div className='w-full'>
                <form onSubmit={handleSubmit}>
                    <label
                        className={`${styles.label}`}
                        htmlFor="email"
                    >
                        Enter your email <span className='text-red-600'>&#42;</span>
                    </label>
                    <input
                        id='email'
                        type='email'
                        name=''
                        value={values.email}
                        onChange={handleChange}
                        placeholder='abcd123@gmail.com'
                        className={`${errors.email && touched.email && 'border-red-600'} ${styles.input}`}
                    />
                    {
                        errors.email && touched.email &&
                        <span className='text-red-500 pt-2 block'>{errors.email}</span>
                    }

                    {/* password */}
                    <div className='w-full mt-5 mb-1 relative '>
                        <label
                            className={`${styles.label}`}
                            htmlFor="password"
                        >
                            Enter your password <span className='text-red-600'>&#42;</span>
                        </label>
                        <input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            name=''
                            value={values.password}
                            onChange={handleChange}
                            placeholder='xz@#$%&'
                            className={`${errors.password && touched.password && 'border-red-600'} ${styles.input}`}
                        />

                        {
                            showPassword ? (
                                <Image
                                    src="/assets/icons/lock-icon.png"
                                    alt="key icon"
                                    width={27}
                                    height={27}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute bottom-2 right-2 z-1 cursor-pointer'
                                />
                            ) :
                                (
                                    <Image
                                        src="/assets/icons/key-icon.png"
                                        alt="lock icon"
                                        width={27}
                                        height={27}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute bottom-2 right-2 z-1 cursor-pointer'
                                    />
                                )
                        }
                        {
                            errors.password && touched.password &&
                            <span className='text-red-500 pt-2 block'>{errors.password}</span>
                        }
                    </div>

                    <div className='w-full mt-5'>
                        <button type='submit' className={`${styles.button}`} >
                            Login
                        </button>
                    </div>

                    <h5 className='text-center pt-4 text-[14px] font-Poppins text-black dark:text-white '>
                        Or join with
                    </h5>
                    <div className='w-full flex-center gap-4 my-3'>
                        <Image
                            src="/assets/icons/google-logo.png"
                            width={35}
                            height={35}
                            className='cursor-pointer'
                            alt="google icon"
                        />
                        <Image
                            src="/assets/icons/github-logo.png"
                            width={35}
                            height={35}
                            className='cursor-pointer'
                            alt="github icon"
                        />
                    </div>
                </form>

            </div>
        </DialogContent>

    )
}

export default LoginSignup
