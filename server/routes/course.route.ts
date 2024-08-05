import { Router } from "express"
import { isAuthenticated, isInstructor } from "../middleware/auth"
import { uploadCourse } from "../controller/course.controller"

const courseRouter = Router()


courseRouter.post("/create-course", isAuthenticated, isInstructor, uploadCourse)


export default courseRouter