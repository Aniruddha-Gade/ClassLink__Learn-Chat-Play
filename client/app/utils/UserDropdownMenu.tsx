'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useLogoutQuery } from '../../redux/features/auth/authApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'





const UserDropdownMenu = () => {
  const [logout, setLogout] = useState(false)
  const { token, user } = useSelector((state: any) => state.auth)
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false
  })
  const router = useRouter()

  const logoutHandler = async () => {
    setLogout(true)
    toast.success("Logout successfully")
    router.push("/")
    console.log("redirect to home")
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none border-none '>
          <div className='w-8 h-8 '>
            <Image
              src={user?.avatar?.url ? user?.avatar?.url : `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
              width={30}
              height={30}
              className='w-full h-full rounded-full object-cover'
              alt="Profile Icon"
            />
          </div>
        </DropdownMenuTrigger>


        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href='/profile'>
            <DropdownMenuItem >Profile</DropdownMenuItem>
          </Link>

          <Link href='/dashboard'>
            <DropdownMenuItem >Dashboard</DropdownMenuItem>
          </Link>

          <DropdownMenuItem>Team</DropdownMenuItem>

          <DropdownMenuItem onClick={() => logoutHandler()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default UserDropdownMenu