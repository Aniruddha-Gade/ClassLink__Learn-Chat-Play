import { Router } from "express"
import { isAuthenticated, isInstructor, isStudent } from "../middleware/auth"
import {
    addAnswerToQuestionInCourse, addQuestionInCourse, addReplyToReview, addReviewInCourse,
    deleteCourse, editCourse, getAllCourse, getAllCourses, getArchivedCourses, getCourseContentByUser,
    getSingleCourse, unarchiveCourse, uploadCourse, getVideoCipherOTP, getSingleCourseByInstructor
} from "../controller/course.controller"
import { updateAccessToken } from "../controller/user.controller"

const courseRouter = Router()


// Only for Instructor
courseRouter.post("/create-course", updateAccessToken, isAuthenticated, isInstructor, uploadCourse)
courseRouter.put("/edit-course/:id", updateAccessToken, isAuthenticated, isInstructor, editCourse)
courseRouter.put("/add-reply-to-review", updateAccessToken, isAuthenticated, isInstructor, addReplyToReview)
courseRouter.get("/get-courses", updateAccessToken, isAuthenticated, isInstructor, getAllCourses)
courseRouter.delete('/delete-course/:id', updateAccessToken, isAuthenticated, isInstructor, deleteCourse)
courseRouter.get('/get-archived-courses', updateAccessToken, isAuthenticated, isInstructor, getArchivedCourses)
courseRouter.put('/unarchive-course/:id', updateAccessToken, isAuthenticated, isInstructor, unarchiveCourse)
courseRouter.get("/get-course-by-instructor/:id", updateAccessToken, isAuthenticated, isInstructor, getSingleCourseByInstructor)



// open routes
courseRouter.get("/get-course/:id", getSingleCourse)
courseRouter.get("/get-all-courses", getAllCourse)
courseRouter.post("/get-video-cipher-OTP", getVideoCipherOTP)

// Any Authenticated user
courseRouter.get("/get-course-content/:id", updateAccessToken, isAuthenticated, getCourseContentByUser)
courseRouter.put("/add-question", updateAccessToken, isAuthenticated, addQuestionInCourse)
courseRouter.put("/add-answer", updateAccessToken, isAuthenticated, addAnswerToQuestionInCourse)


// only for Student
courseRouter.put("/add-review/:id", updateAccessToken, isAuthenticated, isStudent, addReviewInCourse)




export default courseRouter