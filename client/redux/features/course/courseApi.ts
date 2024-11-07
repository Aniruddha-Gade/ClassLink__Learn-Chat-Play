import { apiSlice } from "../api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create Course
        createCourse: builder.mutation({
            query: ({data}) => ({
                url: "/course/create-course",
                method: "POST",
                body: { data },
                credentials: "include" as const,
            })
        }),
        // Get Al Courses
        getAllCourses: builder.query({
            query: () => ({
                url: "/course/get-courses",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("ALL COURSES OF CURRENT INSTRUCTOR API RESULT => ", result)
                   
                } catch (error: any) {
                    console.log("ALL COURSES OF CURRENT INSTRUCTOR API ERROR => ", error)
                }
            }
        }),
       
       

    })
})


export const { useCreateCourseMutation , useGetAllCoursesQuery } = courseApi