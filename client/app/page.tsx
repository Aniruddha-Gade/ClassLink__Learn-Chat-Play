'use client'

import React, { FC } from 'react'
import Heading from './utils/Heading'

interface Props { }


const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="ClassLink"
        description="ClassLink is platform for for students to learn , chat and play and get help from teachers"
        keywords="Class, MERN, Machine Learning, Programming, Learn, Play, Chat, Study, Teachers, Students"
      />
    </div>
  )
}

export default Page