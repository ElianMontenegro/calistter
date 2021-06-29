import mongoose ,  { Schema, model } from 'mongoose';

interface Phone {
    phone: Number;
   
}

const phoneSchema = new Schema<Phone>({
    phone: {
        type: Number,
        required: true,
        min: 10,
        max: 32
    },
    

});

export default model<Phone>('phone', phoneSchema);
