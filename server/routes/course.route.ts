import { Router } from "express"
import { isAuthenticated, isInstructor } from "../middleware/auth"
import { addAnswerToQuestionInCourse, addQuestionInCourse, addReplyToReview, addReviewInCourse, editCourse, getAllCourse, getCourseContentByUser, getSingleCourse, uploadCourse } from "../controller/course.controller"

const courseRouter = Router()


// Only for Instructor
courseRouter.post("/create-course", isAuthenticated, isInstructor, uploadCourse)
courseRouter.put("/edit-course/:id", isAuthenticated, isInstructor, editCourse)
courseRouter.put("/add-reply-to-review", isAuthenticated, isInstructor, addReplyToReview)


courseRouter.get("/get-course/:id", getSingleCourse)
courseRouter.get("/get-all-courses", getAllCourse)
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseContentByUser)
courseRouter.put("/add-question", isAuthenticated, addQuestionInCourse)
courseRouter.put("/add-answer", isAuthenticated, addAnswerToQuestionInCourse)
courseRouter.put("/add-review/:id", isAuthenticated, addReviewInCourse)




export default courseRouter