import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    _id: string;
    username: string;
    email: string;
    role: string;
    password: string;
    date: Date;
    phone?: number;
    posts: (any)[];
}