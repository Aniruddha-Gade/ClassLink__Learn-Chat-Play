

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



export interface ICourse {
    _id:string;
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  courseData: {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    links: { title: string; url: string }[];
    suggestion: string;
  }[];
}