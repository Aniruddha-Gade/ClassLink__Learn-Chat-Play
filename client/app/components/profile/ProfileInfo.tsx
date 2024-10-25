import React, { FC, useState } from "react";
import Image from "next/image";
import { styles } from "../../../app/styles/style";
import { formatDate } from '../../../lib/formatDate'


type Props = {
    avatar: string | null;
    user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);

    const imageHandler = async (e: any) => {
        console.log('gggg');
    };

    const handleSubmit = async (e: any) => {
        console.log("submit");
    };

    return (
        <div className="relative ">
            <div className="w-full flex justify-center">
                <div className="relative ">
                    <Image
                        src={user?.avatar?.url || avatar || `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
                        alt={`${user.name} profile`}
                        width={30}
                        height={30}
                        className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                    />
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        onChange={imageHandler}
                        className='hidden'
                        accept="image/png,image/jpg,image/jpeg,image/webp "
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[38px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            change
                        </div>
                    </label>
                </div>
            </div>


            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInfo;