import mongoose,  { Schema, model, Error, Mongoose, Number } from 'mongoose';
import bcrypt, {genSalt} from "bcrypt";

const salt: number = 10;

interface User {
    username: string;
    email: string;
    role: string;
    password: string;
    date: Date;
    phone: number;
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
    phone: {
        type: Number,
        minlength: 10
    }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(salt, async (err, salt) => {
        try {
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (error) {
            console.log(error);
        }
    });
});
 


export default  model<User>('user', userSchema);
