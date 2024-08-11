
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from './../utils/ErrorHandler';
import notificationModel from '../models/notification.model';





// =========================== GET ALL NOTIFICATIONS ===========================
export const getAllNotifications = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id

        const allNotifications = await notificationModel.find({
            status: { $eq: "unread" }, // fetch un-read notifications
            instructorId: { $eq: userId }, // fetch only particular instructor notifications
        }).sort({ createdAt: -1 })


        return res.status(201).json({
            success: true,
            allNotifications,
            message: "All Notifications fecthed successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching notification"));
    }
}
)
