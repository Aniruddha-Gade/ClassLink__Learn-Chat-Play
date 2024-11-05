import { Router } from "express"
import { isAuthenticated, isInstructor, isStudent } from "../middleware/auth"
import { createOrder, getAllOrders } from "../controller/order.controller"
import { updateAccessToken } from "../controller/user.controller"

const orderRouter = Router()

// only for Student
orderRouter.post('/create-order', updateAccessToken, isAuthenticated, isStudent, createOrder)


// only for Instructor
orderRouter.get('/get-all-orders', updateAccessToken, isAuthenticated, isInstructor, getAllOrders)



export default orderRouter
