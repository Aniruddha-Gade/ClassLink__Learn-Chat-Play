import { Router } from "express"
import { isAuthenticated, isInstructor } from "../middleware/auth"
import { addAnswerToQuestionInCourse, addQuestionInCourse, editCourse, getAllCourse, getCourseContentByUser, getSingleCourse, uploadCourse } from "../controller/course.controller"

const courseRouter = Router()


courseRouter.post("/create-course", isAuthenticated, isInstructor, uploadCourse)
courseRouter.put("/edit-course/:id", isAuthenticated, isInstructor, editCourse)
courseRouter.get("/get-course/:id", getSingleCourse)
courseRouter.get("/get-all-courses", getAllCourse)
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseContentByUser)
courseRouter.put("/add-question", isAuthenticated, addQuestionInCourse)
courseRouter.put("/add-answer", isAuthenticated, addAnswerToQuestionInCourse)


export default courseRouter