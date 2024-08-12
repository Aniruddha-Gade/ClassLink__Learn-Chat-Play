import { Router } from "express"
import { isAuthenticated, isInstructor, isStudent } from "../middleware/auth"
import { createOrder, getAllOrders } from "../controller/order.controller"

const orderRouter = Router()

// only for Student
orderRouter.post('/create-order', isAuthenticated, isStudent, createOrder)


// only for Instructor
orderRouter.get('/get-all-orders', isAuthenticated, isInstructor, getAllOrders)



export default orderRouter
