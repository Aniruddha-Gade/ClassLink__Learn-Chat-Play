import { apiSlice } from "../api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create Course
        createCourse: builder.mutation({
            query: ({ data }) => ({
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
        // Delete Course
        deleteCourse: builder.mutation({
            query: ({ id }) => ({
                url: `/course/delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        // get single course by Instructor
        getSingleCourseByInstructor: builder.query({
            query: ({ id }) => ({
                url: `/course/get-course-by-instructor/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        // Edit course by Instructor
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/course/edit-course/${id}`,
                method: "PUT",
                body: data ,
                credentials: "include" as const,
            }),
        }),
    })
})

export const {
    useCreateCourseMutation, useGetAllCoursesQuery,
    useDeleteCourseMutation, useGetSingleCourseByInstructorQuery, useEditCourseMutation

} = courseApi
