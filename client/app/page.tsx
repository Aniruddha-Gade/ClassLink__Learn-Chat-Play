'use client'

import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'

interface Props { }


const Page: FC<Props> = (props) => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div>
      <Heading
        title="ClassLink"
        description="ClassLink is platform for for students to learn , chat and play and get help from teachers"
        keywords="Class, MERN, Machine Learning, Programming, Learn, Play, Chat, Study, Teachers, Students"
      />
      <Header
        setOpen={setOpen}
        open={open}
        activeItem={activeItem}
      />
    </div>
  )
}

export default Page