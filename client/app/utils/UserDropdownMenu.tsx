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
import { signOut } from "next-auth/react"
import { ACCOUNT_TYPE } from '../constants/account-types'





const UserDropdownMenu = () => {
  const [logout, setLogout] = useState(false)
  const { token, user } = useSelector((state: any) => state.auth)
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false
  })
  const router = useRouter()


  const logoutHandler = async () => {
    console.log("clicked for logout")
    setLogout(true)
    await signOut()
    toast.success("Logout successfully")
}

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none border-none '>
          <div className='w-7 h-7 '>
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

          <Link href={`${user?.accountType  === ACCOUNT_TYPE.ADMIN ? '/admin' : user?.accountType  === ACCOUNT_TYPE.INSTRUCTOR ? '/instructor' : 'dashboard'  } `}>
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