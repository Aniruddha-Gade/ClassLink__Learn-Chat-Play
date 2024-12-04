'use client'


import './globals.css'
import React from 'react'
import { Providers } from './Provider';
import ThemeProvider from './utils/Theme-provider';
import { SessionProvider } from "next-auth/react"

import { Poppins, Boogaloo } from "next/font/google";
import { Josefin_Sans } from "next/font/google";

import { useLoadUserQuery } from '../redux/features/api/apiSlice'
import Loader from "./components/Loader/Loader"
import { Toaster } from "./components/ui/sonner"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const boogaloo = Boogaloo({
  subsets: ["latin"],
  weight: ["400"] ,
  variable: "--font-Boogaloo",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} ${boogaloo.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 `}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem  >
              <Custom>
                {children}
                <Toaster />
              </Custom>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}


const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({})
  return (
    <>
      {
        // isLoading ? <Loader /> : <>{children}</>
         <>{children}</>
      }
    </>
  )
}