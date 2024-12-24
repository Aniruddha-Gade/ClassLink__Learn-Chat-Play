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
        getAllAdminsAndInstructors: builder.query({
            query: () => ({
                url: "/auth/get-all-admins-instructors",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        addNewMember: builder.mutation({
            query: ({name,email, accountType}) => ({
                url: "/auth/add-new-member",
                method: "POST",
                body: { name, email, accountType  },
                credentials: "include" as const,
            })
        }),
        deleteMember: builder.mutation({
            query: ({id}) => ({
                url: `/auth/delete-member/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        getAllStudentsForAdmin: builder.query({
            query: () => ({
                url: '/auth/get-all-students',
                method: "GET",
                credentials: "include" as const,
            })
        }),


    })
})


export const { useUpdateAvatarMutation,useUpdateUserInfoMutation,
     useUpdateUserAccountPasswordMutation, useGetAllAdminsAndInstructorsQuery, useAddNewMemberMutation,
     useDeleteMemberMutation, useGetAllStudentsForAdminQuery
     } = userApi