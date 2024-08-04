import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import userModel, { IUser } from '../models/user.model';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from './../utils/ErrorHandler';
import ejs from 'ejs'
import path from 'path';
import sendMail from '../utils/sendMail';
import { accessTokenOptions, refreshTokenOptions, sendToken } from '../utils/jwt';
import { redis } from '../utils/redis';
import { getUserById } from '../services/user.service';
require('dotenv').config()



// =========================== REGISTER USER ===========================
interface IRagistrationBody {
    name: string,
    email: string,
    accountType: string,
    password: string,
    avatar: string
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, accountType, password, avatar } = req.body

        // validate data
        if (!name || !email || !password || !avatar || !accountType) {
            return next(new ErrorHandler('All fields are required', 400, "Error while registering user"))
        }

        // check user already exist or not
        const isUserAlreadyExist = await userModel.findOne({ email })
        if (isUserAlreadyExist) {
            return next(new ErrorHandler('User already exist', 400, "Error while registering user"))
        }

        // create user data
        const user: IRagistrationBody = {
            name,
            email,
            password,
            accountType,
            avatar
        }

        // create token and OTP
        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode

        // send otp through email 
        const emailData = { user: { name: user.name, accountType: user.accountType }, activationCode }
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), emailData)


        try {
            await sendMail({
                email: email,
                subject: "Activate your account on 'ClassLink' Platform",
                template: html,
                emailData
            })

            // send success message
            res.status(201).json({
                success: true,
                activationToken: activationToken.token,
                message: `Please check your email : ${email} to activate your account`
            })
        } catch (error) {
            console.log(`Error while sending email to user with email : ${email} => `, error)
            return next(new ErrorHandler(error.message, 400, "Error while registering user"))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while registering user"))
    }


})



// create Activation Token
interface IActivationToken {
    token: string,
    activationCode: string
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        {
            user,
            activationCode
        },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m"
        }
    );

    return { token, activationCode };
};



// =========================== ACTIVATE USER ===========================
interface IActivationRequest {
    activation_token: string,
    activation_code: string
}

export const activateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest;

        if (!activation_token || !activation_code) {
            return next(new ErrorHandler('activation_token and activation_code are required', 400, "Error while activating user"));
        }

        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string };


        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400, "Error while activating user"));
        }

        const { name, email, password, accountType } = newUser.user;
        // console.log({ name, email, password, accountType })

        // Store user data in the database
        const user = await userModel.create({
            name, email, password, accountType,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully 👍",
        });
    } catch (error: any) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400, "Error while activating user"));
    }
}
);




// =========================== LOGIN USER ===========================
interface ILoginRequest {
    email: string,
    password: string
}

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest

        // validate data
        if (!email || !password) {
            return next(new ErrorHandler('Please enter your email and password', 400, "Error while loging user"));
        }

        // check user has register or not
        const user = await userModel.findOne({ email }).select('+password')
        if (!user) {
            return next(new ErrorHandler('Invalid email', 400, "Error while loging user"));
        }
        // console.log({ user })


        // compare user entered password , with hashed password store in DB
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Invalid password', 400, "Error while loging user"));
        }
        // set the password field to an empty string in the user object ,
        user.password = ''


        // send Token
        sendToken(user, 200, res)


    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while loging user"));
    }
})




// =========================== LOGOUT USER ===========================
export const logoutUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id || ""

        // remove id from redis
        redis.del(userId)

        // set cookies empty
        res.cookie("access_token", '', { maxAge: 1 });
        res.cookie("refresh_token", '', { maxAge: 1 });

        res.status(200).json({
            success: true,
            message: "User logout successfully"
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while logout user"));
    }
})




// =========================== LOGOUT USER ===========================
export const updateAccessToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;

        const decodedToken = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;


        if (!decodedToken) {
            return next(new ErrorHandler('Could not refresh token, refresh_token is invalid', 400, "Error while updating access token"));
        }

        const session = await redis.get(decodedToken._id as string);


        if (!session) {
            return next(new ErrorHandler('Could not refresh token, could not get data from redis', 400, "Error while updating access token"));
        }

        // get data from redis
        const user = JSON.parse(session);


        // create tokens
        const accessToken = jwt.sign(
            { id: user._id, accountType: user.accountType },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id, accountType: user.accountType },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "3d" }
        );

        // set cookies
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        res.status(200).json({
            success: true,
            accessToken,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while updating access token"));
    }
})




// =========================== GET USER INFO ===========================
export const getUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id as string;
        getUserById(userId, res)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching userInfo"));
    }
})




// =========================== SOCIAL AUTH ===========================
interface ISocialAuth {
    email: string,
    name: string,
    avatar: string,
    accountType: string,
}

export const socialAuth = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar, accountType } = req.body as ISocialAuth
        if (!email || !name || !avatar || !accountType) {
            return next(new ErrorHandler('Email, name, avatar, accountType is required for social auth', 400, "Error while social auth"));
        }

        // if user exist then send token ,
        // if not, then create user and send token
        const user = await userModel.findOne({ email })
        if (!user) {
            const newUser = await userModel.create({ email, name, avatar, accountType })
            sendToken(newUser, 200, res)
        }
        else {
            sendToken(user, 200, res)
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while social auth"));
    }
})




// =========================== UPDATE USER INFO ===========================
interface IUpdateUserInfo {
    name: string,
    avatar: string,
}

export const updateUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, avatar } = req.body as IUpdateUserInfo


        const userId = req.user?._id as string
        console.log({ userId})
        // find and update user info
        const user = await userModel.findById(userId)
        if (!user) {
            return next(new ErrorHandler('User not found to update user-info', 400, "Error while updating userinfo"));
        }

        // Update fields if provided
        if (name) {
            user.name = name;
        }

        if (avatar) {
            user.avatar.url = avatar;
        }

        // Save the updated user
        await user.save();

        // update data in redis
        redis.set(userId, JSON.stringify(user))

        res.status(201).json({
            succes: true,
            user,
            message: "User info updated successully"
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while updating userinfo"));
    }
})