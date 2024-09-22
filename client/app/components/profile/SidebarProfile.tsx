import React, { useState } from 'react'
import Image from 'next/image'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"


type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;
}


const SidebarProfile: React.FC<Props> = ({ user, active, setActive, avatar, logoutHandler }) => {

    const [isDialogOpen, setDialogOpen] = useState(false);


    return (
        <div className="w-full">
            {/* my account */}
            <div
                className={`w-full flex gap-3 items-center px-3 py-4 cursor-pointer 
                            ${active === 1 ? "bg-slate-300 dark:bg-slate-800" : "bg-transparent"} `}
                onClick={() => setActive(1)}
            >

                <Image
                    className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full "
                    src={user?.avatar?.url ? user?.avatar?.url : `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}

                    width={30}
                    height={30}
                    alt="Profile"
                />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">My Account</h5>
            </div>

            {/* Change Password */}
            <div
                className={`w-full flex gap-3 items-center px-3 py-4 cursor-pointer
                     ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <Image
                    src="/assets/icons/lock-icon.png"
                    alt="key icon"
                    width={25}
                    height={25}
                    className=''
                />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">Change Password</h5>
            </div>

            {/* Enrolled Courses */}
            <div
                className={`w-full flex gap-3 items-center px-3 py-4 cursor-pointer
                     ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <Image
                    src="/assets/icons/course-icon.png"
                    alt="key icon"
                    width={25}
                    height={25}
                    className=''
                />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">Enrolled Courses</h5>
            </div>

            {/* logout */}
            <div
                className={`w-full flex gap-3 items-center px-3 py-4 cursor-pointer
                     ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => {
                    setActive(4);
                    setDialogOpen(true); // Open the dialog when clicked
                }}
            >

                <Image
                    src="/assets/icons/logout-icon.png"
                    alt="key icon"
                    width={25}
                    height={25}
                    className=''
                />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">Logout</h5>

            </div>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to logout?</DialogTitle>
                        <DialogDescription className='mb-10'>
                            This action will not delete your data.<br />
                            You can login again any time.
                        </DialogDescription>

                        <div className='flex my-10 gap-5'>
                            <Button
                                onClick={() => {
                                    setDialogOpen(false)
                                    logoutHandler()
                                }}
                                className="dark:text-white bg-red-500 dark:bg-red-500 hover:bg-red-600 hover:dark:bg-red-600">
                                Logout
                            </Button>
                            <Button
                                onClick={() => setDialogOpen(false)}
                                className="dark:text-white bg-green-500 dark:bg-green-500 hover:bg-green-600 hover:dark:bg-green-600">
                                Cancel
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}


export default SidebarProfile