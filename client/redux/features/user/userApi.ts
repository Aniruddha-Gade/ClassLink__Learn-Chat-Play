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
            query: (name) => ({
                url: "/auth/update-userinfo",
                method: "POST",
                body: { name },
                credentials: "include" as const,
            })
        })

    })
})


export const { useUpdateAvatarMutation,useUpdateUserInfoMutation } = userApi