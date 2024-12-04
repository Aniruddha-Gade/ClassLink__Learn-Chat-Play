import { apiSlice } from "../api/apiSlice";


export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateHeroData: builder.mutation({
            query: (data) => ({
                url: '/layout/update-layout',
                method: "PUT",
                body:data,
                credentials: "include" as const,
            })
        }),
        


    })
})


export const { useUpdateHeroDataMutation,} = layoutApi