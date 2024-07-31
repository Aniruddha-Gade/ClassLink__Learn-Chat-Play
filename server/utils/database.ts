import mongoose from 'mongoose'
require('dotenv').config()

const DATABASE_URL: string = process.env.DATABASE_URL || ''


const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL)
            .then((data: any) => {
                console.log("Database Connected Successfully 🟢🟢")
            })

    } catch (error) {
        console.log("Error while connecting MongoDB Database => ", error)
        setTimeout(connectDB, 5000)
    }
}

export default connectDB