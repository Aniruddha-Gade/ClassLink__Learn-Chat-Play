import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { styles } from "../../../app/styles/style";
import { formatDate } from '../../../lib/formatDate'
import { useUpdateAvatarMutation, useUpdateUserInfoMutation } from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Button } from "../ui/button"
import { toast } from "sonner";

type Props = {
    avatar: string | null;
    user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isLoading, isSuccess, error }] = useUpdateAvatarMutation()
    const [loadUser, setLoadUser] = useState(false)
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })

    // update-user-info
    const [updateUserInfo, {isLoading: updateUserInfoIsLoading,isSuccess: updateUserInfoSuccess, error:updateUserInfoError }]=useUpdateUserInfoMutation() 

    // image Handler
    const imageHandler = async (e: any) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            const avatar = fileReader.result
            if (fileReader.readyState === 2) {
                updateAvatar(avatar)
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (isSuccess) {
            setLoadUser(true)
        }
        if (error) {
            if ("data" in error) {
                console.log("ERROR WHILE UPDATING USER AVATAR => ", error)
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }


        if (updateUserInfoSuccess) {
            setLoadUser(true)
            toast.success("Name changed Successfully")
        }
        if (updateUserInfoError) {
            if ("data" in updateUserInfoError) {
                console.log("UPDATE USER-INFO API ERROR => ", updateUserInfoError)
                const errorData = updateUserInfoError as any
                toast.error(errorData.data.message)
            }

        }
    }, [isSuccess, error,updateUserInfoSuccess,updateUserInfoError])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        updateUserInfo(name)
    };

    return (
        <div className="relative ">
            <div className="w-full flex justify-center">
                <div className="relative ">
                    {
                        isLoading ?
                            <div className="w-[120px] h-[120px] cursor-not-allowed border-[3px] border-[#37a39a] rounded-full skeleton"
                            ></div>
                            :
                            <Image
                                src={user?.avatar?.url || avatar || `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
                                alt={`${user.name} profile`}
                                width={30}
                                height={30}
                                className="w-[120px] h-[120px] border-[3px] border-[#37a39a] rounded-full"
                            />
                    }
                    {
                        !isLoading &&
                        <>
                            <input
                                type="file"
                                name=""
                                id="avatar"
                                onChange={imageHandler}
                                className='hidden'
                                accept="image/png,image/jpg,image/jpeg,image/webp "
                            />
                            <label htmlFor="avatar">
                                <div className="w-[68px] h-[28px] bg-slate-600 rounded-full absolute bottom-2 -right-5 flex items-center justify-center cursor-pointer">
                                    change
                                </div>
                            </label>
                        </>
                    }
                </div>
            </div>


            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10 pb-24">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto pb-4 flex flex-col gap-5">
                        <div className="w-[100%]">
                            <label className="block text-black dark:text-white">Full Name</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 required`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-[100%] pt-2 ">
                            <label className="block text-black dark:text-white">Email Address</label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 required cursor-not-allowed`}
                                required
                                value={user?.email}

                            />
                        </div>

                        <div className="w-[100%] pt-2 ">
                            <label className="block text-black dark:text-white">Account Type</label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 required cursor-not-allowed`}
                                required
                                value={user?.accountType}
                            />
                        </div>

                        <div className="w-[100%] pt-2 ">
                            <label className="block text-black dark:text-white">Account Verified</label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 required cursor-not-allowed`}
                                required
                                value={user?.isVerified === false ? "No" : "Yes"}
                            />
                        </div>

                        <div className="w-[100%] pt-2 ">
                            <label className="block text-black dark:text-white">Account Created At</label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 required cursor-not-allowed`}
                                required
                                value={formatDate(user?.createdAt)}
                            />
                        </div>
                   
                        <Button type='submit' >
                            {
                                updateUserInfoIsLoading ? "Submitting..." : 'Submit'
                            }
                    </Button>
                    </div>



                </form>
            </div>
        </div>
    );
};

export default ProfileInfo;