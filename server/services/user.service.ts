import {Request, Response } from "express"
import { redis } from "../utils/redis"
import userModel from "../models/user.model"

// =========================== GET USER BY ID ===========================
export const getUserById = async (req: Request,  res: Response,id: string) => {
    const userJson = await redis.get(id)
    const access_token = req?.cookies?.access_token as string

    if (userJson) {
        const user = JSON.parse(userJson)
        res.status(201).json({
            success: true,
            user,
            access_token,
            message: "User data fetch by ID successfully"
        })
    }
}



// =========================== GET ALL USERS ===========================
export const getAllUsersService = async (res: Response) => {

    const allUsers = await userModel.find().sort({ createdAt: -1 })

    res.status(201).json({
        success: true,
        allUsers,
        message: "All Users fetched successfully"
    })

}


// =========================== GET ALL USERS ===========================
export const updateUserRoleService = async (res: Response, id: string, accountType: string) => {
const user =await userModel.findById(id)
console.log("user = ",user)     
    const updatedUser = await userModel.findByIdAndUpdate(id,
        { accountType },
        { new: true, runValidators: true } // Ensure validation runs on update
    )

    res.status(201).json({
        success: true,
        updatedUser,
        message: "User updated successfully"
    })

}