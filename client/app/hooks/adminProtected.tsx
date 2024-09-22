import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from '../constants/account-types'


interface ProtectedProps {
  children: React.ReactNode;
}

export default function useAdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.accountType === ACCOUNT_TYPE.ADMIN;

  return isAdmin ? children : redirect("/");
}