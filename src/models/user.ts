import mongoose,  { Schema, model } from 'mongoose';

interface User {
    username: string;
    email: string;
    role: string;
    password: string;
    date: Date;
    phone:mongoose.Types.ObjectId;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 32
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 320
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone:[{ type: mongoose.Types.ObjectId, ref: 'phone' }]
});




export default  model<User>('user', userSchema);
