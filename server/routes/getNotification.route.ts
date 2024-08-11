import { Router } from "express";
import { isAuthenticated, isInstructor } from './../middleware/auth';
import { getAllNotifications } from "../controller/notification.controller";
const notificationsRouter = Router()


// Only for Instructors
notificationsRouter.get("/get-all-notifications", isAuthenticated, isInstructor, getAllNotifications)



export default notificationsRouter