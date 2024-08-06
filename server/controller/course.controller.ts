
import cloudinary from 'cloudinary';
import { catchAsyncError } from '../utils/catchAsyncError';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { createCourse } from '../services/course.service';
import CourseModel from '../models/course.model';
import { redis } from './../utils/redis';
import mongoose from 'mongoose';
import ejs from 'ejs';
import path from 'path';
import sendMail from './../utils/sendMail';



// =========================== UPLOAD COURSE ===========================
export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // extract data 
        const createdBy = req.user._id
        const data = req.body;
        const thumbnail = data.thumbnail

        if (thumbnail) {
            const uploadedUrl = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "ClassLink/courses",
            })

            // store urls 
            data.thumbnail = {
                public_id: uploadedUrl.public_id,
                url: uploadedUrl.secure_url,
            }
        }

        data.createdBy = createdBy;
        // create course in DB
        createCourse(data, res, next)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating course"));
    }
})




// =========================== UPLOAD COURSE ===========================
export const editCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // extract data 
        const data = req.body;
        const thumbnail = data.thumbnail

        // user ID
        const createdBy = req.user._id
        // get course ID
        const courseId = req.params.id


        // delete previous thumbnail and upload new one
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const uploadedUrl = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "ClassLink/courses",
            })

            // store urls 
            data.thumbnail = {
                public_id: uploadedUrl.public_id,
                url: uploadedUrl.secure_url,
            }
        }

        // update course in DB
        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, createdBy: createdBy },
            {
                $set: data,
            },
            { new: true }
        )

        if (!updatedCourse) {
            return next(new ErrorHandler("Course could not be found or you are not authorized to edit this course", 400, "Error while creating course"));
        }

        // return response
        res.status(201).json({
            success: true,
            updatedCourse,
            message: "Course updated successfully"
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating course"));
    }
})




// =========================== GET SINGLE COURSE ( WITHOUT PURCHASING ) ===========================
export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courseId = req.params.id

        const isCacheExist = await redis.get(courseId)   // check Is data available in redis 
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist)

            // console.log("Hitting Redis")
            // return response
            res.status(201).json({
                success: true,
                course,
                message: "Course found successfully"
            })
        }

        else {
            // get course ID
            const course = await CourseModel.findById(courseId)
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

            if (!course) {
                return next(new ErrorHandler("Course could not be found course", 400, "Error while fetching course"));
            }

            // store in redis
            await redis.set(courseId, JSON.stringify(course))

            // console.log("Hitting MongoDB")
            // return response
            res.status(201).json({
                success: true,
                course,
                message: "Course found successfully"
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching course"));
    }
})




// =========================== GET ALL COURSE ( WITHOUT PURCHASING ) ===========================
export const getAllCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // check Is all courses data available in redis 
        const isCacheExist = await redis.get("allCourses")

        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);

            // console.log("Hitting Redis")
            // return response
            res.status(201).json({
                success: true,
                courses,
                message: "All Courses data found successfully"
            })
        }

        else {
            const courses = await CourseModel.find()
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

            if (!courses) {
                return next(new ErrorHandler("Course could not be found all courses", 400, "Error while fetching courses"));
            }

            // store in redis
            await redis.set("allCourses", JSON.stringify(courses));

            // console.log("Hitting MongoDB")
            // return response
            res.status(201).json({
                success: true,
                courses,
                message: "All Courses found successfully"
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching courses"));
    }
})





// =========================== GET COURSE BY USER ( ONLY FOR VALID USER  ) ===========================
export const getCourseContentByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userCourseList = req.user?.courses
        const courseId = req.params.id

        const courseExists = userCourseList?.find((course: any) => course._id.toString() == courseId)

        if (!courseExists) {
            return next(new ErrorHandler("You are not eligible to access this course", 400, "Error while fetching course content"));
        }

        const course = await CourseModel.findById(courseId)
        const content = course?.courseData

        // return response
        res.status(201).json({
            success: true,
            content,
            message: "Content of Course found successfully"
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching course content"));
    }
})





// =========================== ADD QUESTION IN COURSE ===========================
interface IAddQuestionInCourseData {
    question: string,
    courseId: string,
    contentId: string,
}

export const addQuestionInCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { question, courseId, contentId } = req.body as IAddQuestionInCourseData


        // check content ID valid or not
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("ID of content is Invalid", 400, "Error while adding question in course`"));
        }

        // find course
        const course = await CourseModel.findById(courseId)
        if (!course) {
            return next(new ErrorHandler("Course not found", 400, "Error while adding question in course`"));
        }


        // find contnet from course
        const courseContent = course?.courseData.find((item: any) => item?._id.equals(contentId))
        if (!courseContent) {
            return next(new ErrorHandler("content not found or Invalid", 400, "Error while adding question in course`"));
        }

        // push question
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: [],
        }
        courseContent.questions.push(newQuestion)

        // save updated course
        await course.save()

        res.status(201).json({
            success: true,
            course,
            message: "Question added successfully"
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while adding question in course`"));
    }
})





// =========================== ADD ANSWER TO QUESTION IN COURSE ===========================
interface IAddAnswerToQuestionInCourseData {
    courseId: string,
    contentId: string,
    questionId: string,
    answer: string,
}

export const addAnswerToQuestionInCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { answer, questionId, courseId, contentId } = req.body as IAddAnswerToQuestionInCourseData


        // check content ID valid or not
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("ID of content is Invalid", 400, "Error while adding question in course`"));
        }

        // find course
        const course = await CourseModel.findById(courseId)
        if (!course) {
            return next(new ErrorHandler("Course not found", 400, "Error while adding question in course`"));
        }


        // find course-Content from course
        const courseContent = course?.courseData.find((item: any) => item?._id.equals(contentId))
        if (!courseContent) {
            return next(new ErrorHandler("content not found or Invalid", 400, "Error while adding question in course`"));
        }

        // find question from course-Content
        const question = courseContent.questions.find((que: any) => que?._id.equals(questionId))
        if (!question) {
            return next(new ErrorHandler("question not found or Invalid content", 400, "Error while adding question in course`"));
        }


        // push answer
        const newAnswer: any = {
            user: req.user,
            answer
        }
        question.questionReplies?.push(newAnswer)

        // save updated course
        await course.save()

        // create notification
        if (req.user._id === question.user._id) {
            console.log("received notification")
        }

        // send mail
        else {
            const emailData = {
                name: question.user.name,
                title: courseContent.title
            }
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), emailData)
            
            try {
                await sendMail({
                    email: question.user.email,
                    template: html,
                    subject: "Question Reply",
                    emailData
                })
            } catch (error) {
                return next(new ErrorHandler(error.message, 400, "Error while sending email for question reply"));
            }
        }


        res.status(201).json({
            success: true,
            course,
            message: "Reply for Question added successfully"
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while adding question in course`"));
    }
})