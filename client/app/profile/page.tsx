'use client'

import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Protected from '../hooks/useProtectedRoute'
import Profile from "../components/profile/Profile"


interface Props {

}

const ProfilePage: React.FC<Props> = () => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  const { user } = useSelector((state: any) => state.auth)

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} Profile`}
          description="ClassLink is platform for for students to learn , chat and play and get help from teachers"
          keywords="Class, MERN, Machine Learning, Programming, Learn, Play, Chat, Study, Teachers, Students"
        />

        {/* navbar */}
        <Header
          setOpen={setOpen}
          open={open}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />

        <Profile />

        
      </Protected>
    </div>
  )
}

export default ProfilePage
