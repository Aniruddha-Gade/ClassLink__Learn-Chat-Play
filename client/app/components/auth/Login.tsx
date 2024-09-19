'use client'

import React, { FC, useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import { useFormik, } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { styles } from '../../styles/style';
import Image from 'next/image';
import AsteriskSymbol from './../../utils/AsteriskSymbol';
import LoadingButtonText from '../../utils/LoadingButtonText';
import { useLoginMutation } from '../../../redux/features/auth/authApi';


type Props = {
    setRoute: (route: string) => void
    setOpen: (open: boolean) => void;
}




const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
})


const Login: FC<Props> = ({ setRoute, setOpen }) => {

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log({ email, password })
            await login({ email, password })
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik
    const [showPassword, setShowPassword] = useState(false)
    const [login, { isSuccess, error, isLoading }] = useLoginMutation()
    const router = useRouter()
    
        useEffect(() => {
            if (isSuccess) {
                toast.success("Login Successfully")
                setOpen(false)
            }
            if (error) {
                if ("data" in error) {
                    console.log("USER REGISTER API ERROR => , error")
                    const errorData = error as any
                    toast.error(errorData.data.message)
                }
            }
        }, [isSuccess, error, setOpen, router])

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                {/* email field */}
                <label
                    className={`${styles.label}`}
                    htmlFor="email"
                >
                    Enter your email <AsteriskSymbol />
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

                {/* password field */}
                <div className='w-full mt-5 mb-1 relative '>
                    <label
                        className={`${styles.label}`}
                        htmlFor="password"
                    >
                        Enter your password <AsteriskSymbol />
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
                    {/* show icon on basis of showPassword */}
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
                </div>
                {
                    errors.password && touched.password &&
                    <span className='text-red-500 pt-2 block'>{errors.password}</span>
                }

                <div className='w-full mt-5'>
                <button type='submit' disabled={isLoading} className={`${styles.button}`} >
                        {
                            isLoading ? <LoadingButtonText />
                                : 'Login'
                        }
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
    )
}

export default Login
