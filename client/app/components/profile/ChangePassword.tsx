import React, { FC, useState } from "react";
import { styles } from './../../styles/style';
import { Button } from "../ui/button"
import { toast } from "sonner";

type Props = {}


const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // password Change Handler
  const passwordChangeHandler = (e: React.FormEvent) => {
    e.preventDefault();

  }

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-bold text-green-600 pb-2">
        Change Password
      </h1>


      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="800px:w-[50%] m-auto pb-4 flex flex-col gap-5">
            <div className="w-[100%] mt-5">
              <label htmlFor='old-password' className="cursor-pointer block pb-2 text-black dark:text-[#fff]">
                Enter your old password
              </label>
              <input
                id='old-password'
                type="password"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] mt-2">
              <label htmlFor='new-password' className="cursor-pointer block pb-2 text-black dark:text-[#fff]">Enter your new password</label>
              <input
                id='new-password'
                type="password"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] mt-2">
              <label htmlFor='confirm-new-password' className="cursor-pointer block pb-2 text-black dark:text-[#fff]">Enter your confirm password</label>
              <input
                id='confirm-new-password'
                type="password"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>



            <Button type='submit' >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
