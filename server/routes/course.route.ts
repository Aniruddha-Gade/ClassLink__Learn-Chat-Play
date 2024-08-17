import { Router } from "express"
import { isAuthenticated, isInstructor, isStudent } from "../middleware/auth"
import { addAnswerToQuestionInCourse, addQuestionInCourse, addReplyToReview, addReviewInCourse, deleteCourse, editCourse, getAllCourse, getAllCourses, getArchivedCourses, getCourseContentByUser, getSingleCourse, unarchiveCourse, uploadCourse } from "../controller/course.controller"

const courseRouter = Router()


// Only for Instructor
courseRouter.post("/create-course", isAuthenticated, isInstructor, uploadCourse)
courseRouter.put("/edit-course/:id", isAuthenticated, isInstructor, editCourse)
courseRouter.put("/add-reply-to-review", isAuthenticated, isInstructor, addReplyToReview)
courseRouter.get("/get-courses", isAuthenticated, isInstructor, getAllCourses)
courseRouter.delete('/delete-course', isAuthenticated, isInstructor, deleteCourse)
courseRouter.get('/get-archived-courses', isAuthenticated, isInstructor, getArchivedCourses)
courseRouter.put('/unarchive-course/:id', isAuthenticated, isInstructor, unarchiveCourse)



// open routes
courseRouter.get("/get-course/:id", getSingleCourse)
courseRouter.get("/get-all-courses", getAllCourse)

// Any Authenticated user
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseContentByUser)
courseRouter.put("/add-question", isAuthenticated, addQuestionInCourse)
courseRouter.put("/add-answer", isAuthenticated, addAnswerToQuestionInCourse)


// only for Student
courseRouter.put("/add-review/:id", isAuthenticated, isStudent, addReviewInCourse)




export default courseRouter