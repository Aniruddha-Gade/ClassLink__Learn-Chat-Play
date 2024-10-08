import mongoose, { Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()



const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    accountType: 'Admin' | 'Instructor' | 'Student';
    isVerified: boolean;
    courses: mongoose.Types.ObjectId[];
    comparePassword: (password: string) => Promise<boolean>;
    signAccessToken: () => string;
    signRefreshToken: () => string;
}


const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false // whenever we fetch user data from DB , by default password will be excluded
    },
    avatar: {
        public_id: String,
        url: String,
    },
    accountType: {
        type: String,
        enum: ['Admin', 'Instructor', 'Student'],
        default:"Student",
        reuired: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
}, { timestamps: true });


// Hash Password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});


// compare user entered password , with hashed password store in DB
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}


// sign Access Token
userSchema.methods.signAccessToken = function () {
    return jwt.sign({ _id: this._id, accountType: this.accountType, email: this.email, name: this.name }, process.env.ACCESS_TOKEN_SECRET || '', {
        expiresIn: '5m'
    })
}

// sign Refresh Token
userSchema.methods.signRefreshToken = function () {
    return jwt.sign({ _id: this._id, accountType: this.accountType, email: this.email, name: this.name }, process.env.REFRESH_TOKEN_SECRET || '', {
        expiresIn: '3d'
    })
}







const userModel: Model<IUser> = mongoose.model("User", userSchema)
export default userModel