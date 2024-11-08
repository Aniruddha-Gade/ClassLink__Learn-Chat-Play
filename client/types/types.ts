

export interface IUser {
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
    // courses: mongoose.Types.ObjectId[];
}