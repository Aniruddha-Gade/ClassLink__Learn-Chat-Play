
import React from 'react'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  // activeItem: number;
  // route: string;
  // setRoute: (route: string) => void
}


const Verification: React.FC<Props> = ({ open, setOpen }) => {


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      {/* <DialogTrigger className='text-4xl text-red-600 bg-green-500 ' >Open</DialogTrigger> */}
      <DialogContent className='bg-red-500'>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default Verification
