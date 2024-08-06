
import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken'
require('dotenv').config()



// =========================== IS AUTHENTICATED ===========================
export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token as string

        if (!access_token) {
            return next(new ErrorHandler('Please login to access this resource', 400, "Error while authenticating"));
        }

        // decode token
        const decodeToken = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
        if (!decodeToken) {
            return next(new ErrorHandler('Access token is invalid', 400, "Error while authenticating"));
        }
        console.log({ decodeToken })
        // example - 
        // {
        //     id: '66aba2df71540941066d1847',
        //     accountType: 'Instructor',
        //     email: 'radhamasale889@gmail.com',
        //     name: 'Aniruddha gade'
        //     iat: 1722676678,
        //     exp: 1722947183
        // }

        // store in request
        req.user = decodeToken
        // console.log('req.user = ', req.user)

        // call next middleware
        next()

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating"));
    }
})




// =========================== IS STUDENT ===========================
export const isStudent = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType !== 'Student') {
            return next(new ErrorHandler(`Role : ${req.user?.accountType} is not allowed to access this resource`, 403, "Error while authenticating student"));
        }

        // go to next middleware
        next();

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating student"));
    }
})




// =========================== IS INSTRUCTOR ===========================
export const isInstructor = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== 'Instructor') {
            return next(new ErrorHandler(`Role : ${req.user?.accountType} is not allowed to access this resource`, 403, "Error while authenticating Instructor"));
        }

        // go to next middleware
        next();

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating Instructor"));
    }
})




// =========================== IS INSTRUCTOR ===========================
export const isAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== 'Admin') {
            return next(new ErrorHandler(`Role : ${req.user?.accountType} is not allowed to access this resource`, 403, "Error while authenticating Admin"));
        }

        // go to next middleware
        next();

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating Admin"));
    }
})