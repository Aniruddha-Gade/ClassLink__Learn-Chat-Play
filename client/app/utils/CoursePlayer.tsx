'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Props {
    videoUrl: string,
    title: string,
}



const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {

    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/get-video-cipher-OTP`, {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data)
        })
    }, [videoUrl])


    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=7xGTna0AOY5IRA12 `}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    />
                )
            }
        </div>
    )
}

export default CoursePlayer
