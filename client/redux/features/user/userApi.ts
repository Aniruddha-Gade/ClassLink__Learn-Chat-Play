import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "/auth/update-user-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const,
            })
        }),
        updateUserInfo: builder.mutation({
            query: (name:string) => ({
                url: "/auth/update-userinfo",
                method: "POST",
                body: { name },
                credentials: "include" as const,
            })
        }),
        updateUserAccountPassword: builder.mutation({
            query: ({oldPassword, newPassword}) => ({
                url: "/auth/update-user-password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const,
            })
        }),

    })
})


export const { useUpdateAvatarMutation,useUpdateUserInfoMutation, useUpdateUserAccountPasswordMutation } = userApi