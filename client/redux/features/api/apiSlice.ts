import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userRegistration } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: () => ({
                url: "/auth/refresh-token",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REFRESH TOKEN API RESULT => ", result)
                } catch (error: any) {
                    console.log("REFRESH TOKEN API ERROR => ", error)
                }
            },
        }),


        loadUser: builder.query({
            query: () => ({
                url: "/auth/userinfo",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const result = await queryFulfilled;
                    console.log("USER INFO API RESULT => ", result)
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.access_token,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    console.log("USER INFO API ERROR => ", error)
                }
            },
        }),

    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;