
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from './../utils/ErrorHandler';
import { IOrder } from './../models/order.model';
import userModel from '../models/user.model';
import CourseModel from './../models/course.model';
import { getAllOrdersService, newOrder } from '../services/order.service';
import sendMail from './../utils/sendMail';
import path from 'path';
import ejs from 'ejs';
import notificationModel from '../models/notification.model';
import mongoose from 'mongoose';





// =========================== CREATE ORDER ===========================
export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user?._id
        const { courseId, payment_info } = req.body as IOrder

        // validate data
        if (!courseId) {
            return next(new ErrorHandler("courseId is required", 400, "Error while ordering course"));
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return next(new ErrorHandler("User not found", 404, "Error while ordering course"));
        }

        const courseExistInUser = user.courses.some((course: any) => course._id.toString() === courseId)
        if (courseExistInUser) {
            return next(new ErrorHandler("You have already purchaes this course", 404, "Error while ordering course"));
        }


        const course = await CourseModel.findById(courseId)
        if (!course) {
            return next(new ErrorHandler("Course not found", 404, "Error while ordering course"));
        }

        // for crating order
        const data: any = {
            courseId,
            instructorId: course.createdBy,
            userId,
            payment_info
        }

        // send email to user
        const emailData = {
            user: {
                email: user.email,
                name: user.name
            },
            order: {
                _id: course._id,
                name: course.title,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: 'numeric', month: 'long',
                    day: 'numeric', hour: '2-digit',
                    minute: '2-digit', second: '2-digit'
                }),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, "../mails/order-course-mail.ejs"), emailData)
        try {
            await sendMail({
                email: user.email,
                template: html,
                subject: "Order Confirmation",
                emailData
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 400, "Error while sending email of orderedcourse"));
        }

        // add course to user list
        user?.courses.push(course._id as mongoose.Types.ObjectId);
        // add user in user list of course
        course.users.push(userId as mongoose.Types.ObjectId)

        // update user in DB
        await user.save()

        // create notification for Instructor
        await notificationModel.create({
            userId,
            instructorId: course.createdBy,
            title: "New Order",
            message: `Student: ${user.name} purchased a course - ${course.title}`
        })


        // update course purchased count
        course.purchased = (course.purchased as number) + 1;


        await course.save();


        // create new order in DB
        newOrder(data, res, next)

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while ordering course"));
    }
}
)




// =========================== GET ALL COURSES ===========================
export const getAllOrders = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        getAllOrdersService(req, res)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching all orders"));
    }
})