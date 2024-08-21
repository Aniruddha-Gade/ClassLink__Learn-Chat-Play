'use client'

import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from '../app/components/Route/Hero'


interface Props { }


const Page: FC<Props> = (props) => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  return (
    <div>
      <Heading
        title="ClassLink"
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



      <Hero />

    </div>
  )
}

export default Page