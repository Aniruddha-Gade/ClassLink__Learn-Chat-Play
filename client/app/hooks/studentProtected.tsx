'use client'

import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from '../constants/account-types'

interface ProtectedProps {
  children: React.ReactNode;
}

export default function useStudentProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isStudent = user?.accountType === ACCOUNT_TYPE.STUDENT;

  return isStudent ? children : redirect("/");
}