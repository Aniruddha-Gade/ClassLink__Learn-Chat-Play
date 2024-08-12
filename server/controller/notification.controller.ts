
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from './../utils/ErrorHandler';
import notificationModel from '../models/notification.model';
import cron from 'node-cron'




// =========================== GET ALL UNREAD NOTIFICATIONS ===========================
export const getAllUnReadNotifications = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id

        const allUnReadNotifications = await notificationModel.find({
            status: { $eq: "unread" }, // fetch un-read notifications
            instructorId: { $eq: userId }, // fetch only particular instructor notifications
        }).sort({ createdAt: -1 })


        return res.status(201).json({
            success: true,
            allUnReadNotifications,
            message: "All unread Notifications fecthed successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching all unread notifications"));
    }
}
)





// =========================== GET ALL NOTIFICATIONS ===========================
export const getAllNotifications = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const instructorId = req.user._id


        // get all notifications
        const allNotifications = await notificationModel.aggregate(
            [
                {
                    // Match documents where the instructorId field matches the provided instructorId value
                    $match: {
                        instructorId: instructorId
                    }
                },
                {
                    // Add a new field called sortOrder based on the condition of the status field
                    $addFields: {
                        sortOrder: {
                            // If the status is "unread", set sortOrder to 0, otherwise set it to 1
                            $cond: { if: { $eq: ["$status", "unread"] }, then: 0, else: 1 }
                        }
                    }
                },
                {
                    // Sort documents primarily by sortOrder, then by createdAt date
                    $sort: {
                        // Documents with sortOrder = 0 (unread) will appear first
                        sortOrder: 1,
                        // Within the same sortOrder, sort documents by createdAt in descending order (latest first)
                        createdAt: -1
                    }
                },
                {
                    // Reshapes documents by including, excluding, or adding new fields.
                    // Exclude the sortOrder field from the final output documents
                    $project: {
                        sortOrder: 0 // Exclude the sortOrder field
                    }
                }
            ]
        );



        return res.status(201).json({
            success: true,
            allNotifications,
            message: "All Notification fetched successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fecthing all notifications"));
    }
}
)




// =========================== UPDATE SPECIFIC NOTIFICATIONS ===========================
export const updateNotification = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const instructorId = req.user._id
        const notificationId = req.params.id

        // validate id
        if (!notificationId) {
            return next(new ErrorHandler("notificationId is required", 400, "Error while updating notification"));
        }

        // update 
        const updatedNotification = await notificationModel.findOneAndUpdate(
            { _id: notificationId, instructorId: instructorId },
            { status: "read" },
            { new: true, runValidators: true } // Ensure validation runs on update
        )


        if (!updatedNotification) {
            return next(new ErrorHandler("Notification not found or you are not authorized to update it", 404, "Error while updating notification"));
        }


        // const allNotifications = await notificationModel.find({
        //     instructorId: { $eq: instructorId }, // fetch only particular instructor notifications
        // }).sort({ createdAt: -1 })


        // send all notifications
        getAllNotifications(req, res, next)

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while updating notification"));
    }
}
)





// =========================== CRON JOB - DELETE NOTIFICATION 30 DAYS OLD AT EVERY NIGHT ===========================
cron.schedule("0 0 0 * * *", async () => {
    console.log("Running cron")
    const thirtyDaysAgoDate = new Date(Date.now() - 30 * 24 * 30 * 30 * 1000)

    await notificationModel.deleteMany(
        {
            status: 'read',
            $lt: { thirtyDaysAgoDate } // less than 30 days, in short - delete data before 30 days
        }
    )

    console.log("Deleted read notifications")
})