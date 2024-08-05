import { Router } from "express"
import { isAuthenticated, isInstructor } from "../middleware/auth"
import { editCourse, getSingleCourse, uploadCourse } from "../controller/course.controller"

const courseRouter = Router()


courseRouter.post("/create-course", isAuthenticated, isInstructor, uploadCourse)
courseRouter.put("/edit-course/:id", isAuthenticated, isInstructor, editCourse)
courseRouter.get("/get-course/:id", getSingleCourse)


export default courseRouter