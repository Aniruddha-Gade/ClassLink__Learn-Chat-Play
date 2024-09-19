"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  token:"",
  user: "",
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
     console.log("storing here  ====================")
     console.log("accessToken   = ",action.payload )
     console.log("user   = ",action.payload.user )
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      console.log("removing tokens from local storage")
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer