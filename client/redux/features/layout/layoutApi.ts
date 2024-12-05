import { apiSlice } from "../api/apiSlice";


export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateHeroData: builder.mutation({
            query: (data) => ({
                url: '/layout/update-layout',
                method: "PUT",
                body:data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("update hero data API RESULT => ", result)

                } catch (error: any) {
                    console.log("update hero data API ERROR => ", error)
                }
            }
        }),
        


    })
})


export const { useUpdateHeroDataMutation,} = layoutApi