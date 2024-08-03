
import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken'
require('dotenv').config()


export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token as string

        if (!access_token) {
            return next(new ErrorHandler('Please login to access this resource', 400));
        }

        // decode token
        const decodeToken = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload
        if (!decodeToken) {
            return next(new ErrorHandler('Access token is invalid', 400));
        }
        // console.log({ decodeToken })
        // example - 
        // {
        //     id: '66aba2df71540941066d1847',
        //     accountType: 'Instructor',
        //     iat: 1722676678
        // }

        // store in request
        req.user = decodeToken
        // console.log('req.user = ', req.user)

        // call next middleware
        next()

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})