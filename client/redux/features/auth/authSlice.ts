"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "",
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;

      // save in localStorage
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      console.log("removing tokens from local storage")
      state.token = "";
      state.user = "";

      // remove data from localStorage
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer