import { NextFunction, Request, Response, } from 'express';
import { catchAsyncError } from '../utils/catchAsyncError';
import orderModel from '../models/order.model';


export const newOrder = catchAsyncError(async (data: any, res: Response, next: NextFunction) => {

    const order = await orderModel.create(data)

    res.status(201).json({
        success: true,
        order,
        message: "User has successfully ordered a course"
    })
})




// =========================== GET ALL ORDERS ===========================
export const getAllOrdersService = async (req: Request, res: Response) => {

    const instructorId = req.user._id

    const allOrders = await orderModel.find({
        instructorId
    }).sort({ createdAt: -1 })

    res.status(201).json({
        success: true,
        allOrders,
        message: "All orders fetched successfully"
    })

}