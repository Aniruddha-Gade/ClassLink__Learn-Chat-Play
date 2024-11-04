'use client'

import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface Props {

}

const FlowersRain: React.FC<Props> = () => {

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth, height: window.innerHeight
  })

  useEffect(() => {
    const handleWidtHeight = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      window.addEventListener('resize', handleWidtHeight)

      return () => {
        window.removeEventListener('resize', handleWidtHeight)
      }
    }
  }, [windowDimension])


  return (
    <Confetti
      width={windowDimension.width}
      height={windowDimension.height}
      numberOfPieces={500}
      tweenDuration={5000}
      gravity={0.35}
    />
  )
}

export default FlowersRain
