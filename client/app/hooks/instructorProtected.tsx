'use client'

import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from '../constants/account-types'


interface ProtectedProps {
  children: React.ReactNode;
}

export default function useInstructorProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR;

  return isInstructor ? children : redirect("/");
}