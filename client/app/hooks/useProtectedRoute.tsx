'use client'

import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { user, token } = useSelector((state: any) => state.auth);

  const isAuthenticated = user && token ? true : false

  return isAuthenticated ? children : redirect("/");
}