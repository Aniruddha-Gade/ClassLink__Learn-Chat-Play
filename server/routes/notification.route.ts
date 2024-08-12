import { Router } from "express";
import { isAuthenticated, isInstructor } from '../middleware/auth';
import { getAllNotifications, getAllUnReadNotifications, updateNotification } from "../controller/notification.controller";
const notificationsRouter = Router()


// Only for Instructors
notificationsRouter.get("/get-all-notifications", isAuthenticated, isInstructor, getAllNotifications)
notificationsRouter.get("/get-all-unread-notifications", isAuthenticated, isInstructor, getAllUnReadNotifications)
notificationsRouter.put("/update-notification/:id", isAuthenticated, isInstructor, updateNotification)



export default notificationsRouter