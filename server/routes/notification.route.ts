import { Router } from "express";
import { isAuthenticated, isInstructor } from '../middleware/auth';
import { getAllNotifications, getAllUnReadNotifications, updateNotification } from "../controller/notification.controller";
import { updateAccessToken } from "../controller/user.controller";
const notificationsRouter = Router()


// Only for Instructors
notificationsRouter.get("/get-all-notifications", updateAccessToken, isAuthenticated, isInstructor, getAllNotifications)
notificationsRouter.get("/get-all-unread-notifications", updateAccessToken, isAuthenticated, isInstructor, getAllUnReadNotifications)
notificationsRouter.put("/update-notification/:id", updateAccessToken, isAuthenticated, isInstructor, updateNotification)



export default notificationsRouter