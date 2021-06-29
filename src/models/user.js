import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

export default user = mongoose.model('user', userSchema);
