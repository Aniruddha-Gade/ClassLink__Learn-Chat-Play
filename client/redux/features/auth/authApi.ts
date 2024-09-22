import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/auth/registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REGISTRATION API RESULT => ", result)
                    dispatch(userRegistration({ token: result.data.activationToken }));
                } catch (error: any) {
                    console.log("REGISTRATION API ERROR => ", error)
                }
            },
        }),

        // activate account with OTP and Token
        activation: builder.mutation({
            query: (data) => ({
                url: "/auth/activate-user",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("ACTIVATION USER ACCOUNT API RESULT => ", result)
                } catch (error: any) {
                    console.log("ACTIVATION USER ACCOUNT API ERROR => ", error)
                }
            },
        }),

        // login
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("Login USER API RESULT => ", result)
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken, user: result.data.user
                    }))
                } catch (error: any) {
                    console.log("Login USER API ERROR => ", error)
                }
            }
        }),


        // logout
        logout: builder.query({
            query: () => ({
                url: "/auth/logout",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("LOGOUT USER API RESULT => ", result)
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error: any) {
                    console.log("LOGOUT USER API ERROR => ", error)
                }
            }
        }),


        // social Auth
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "/auth/social-auth",
                method: "POST",
                body: { email, name, avatar },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("SOCIAL AUTH API RESULT => ", result)   
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken, user: result.data.user
                    }))
                } catch (error: any) {
                    console.log("SOCIAL AUTH API ERROR => ", error)
                }
            }
        })
    }),
});


export const { useRegisterMutation, useActivationMutation, useLoginMutation, useLogoutQuery, useSocialAuthMutation  } = authApi