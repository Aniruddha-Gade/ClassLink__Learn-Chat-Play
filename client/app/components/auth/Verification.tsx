
import React, { useState } from 'react'
import Image from 'next/image'
import { styles } from './../../styles/style';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp"



type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void
}


const Verification: React.FC<Props> = ({ open, setOpen, setRoute }) => {
  const [enteredOTP, setEnteredOTP] = useState("")

  const verificationHandler = async () => {
    console.log(" = ", enteredOTP)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className='h-[430px] w-[350px] sm:w-full rounded-3xl sm:rounded-3xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl sm:text-3xl flex items-center gap-3 text-black dark:text-white '>
            Verify Your Account
            <Image
              className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
              src='/assets/icons/trust-icon.png'
              width={30}
              height={30}
              alt="Hand Shake Icon"
            />
          </DialogTitle>
          <DialogDescription>
            Please enter the 4-digit code sent to your registered email to verify your account.<br />
            If you haven&#x27;t received the code, you can request a new one below.
          </DialogDescription>

        </DialogHeader>


        <div className='flex-center flex-col gap-4'>
          <InputOTP
            className='w-full h-full '
            maxLength={4}
            value={enteredOTP}
            onChange={(value: string) => setEnteredOTP(value)}
          >
            <InputOTPGroup className='h-[40px] '>
              <InputOTPSlot index={0} className='h-[40px] border-2 border-black/80 dark:border-white/80 text-black dark:text-white ' />
              <InputOTPSlot index={1} className='h-[40px] border-2 border-black/80 dark:border-white/80 text-black dark:text-white ' />
              <InputOTPSlot index={2} className='h-[40px] border-2 border-black/80 dark:border-white/80 text-black dark:text-white ' />
              <InputOTPSlot index={3} className='h-[40px] border-2 border-black/80 dark:border-white/80 text-black dark:text-white ' />
            </InputOTPGroup>

          </InputOTP>

          <div className="text-center text-sm">
            {enteredOTP === "" ? (
              <>Enter your one-time password</>
            ) : (
              <>You entered: {enteredOTP}</>
            )}
          </div>
        </div>


        <DialogFooter>
          <div className='flex flex-col gap-4 w-full items-center'>
            <button
              onClick={verificationHandler}
              className={`${styles.button}`}
            >
              Verify OTP
            </button>

            <div>
              <h5 className='text-sm text-black dark:text-white'>
                Go back to sign in ? {" "}
                <span
                  onClick={() => setRoute("auth")}
                  className='text-green-600 hover:text-green-500 cursor-pointer '
                >
                  Sign in
                </span>
              </h5>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default Verification
