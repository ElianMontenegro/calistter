import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    phone: {
        type: Number,
        required: true,
        min: 10,
        max: 32
    },
    

});

export default phone = mongoose.model('phone', phoneSchema);
