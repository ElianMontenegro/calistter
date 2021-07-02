import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    username: string;
    email: string;
    role: string;
    password: string;
    date: Date;
    phone: number;
}