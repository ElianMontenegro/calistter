import mongoose, { Schema, model } from "mongoose";

export interface IPost {
    commet: string;
    imagePath: string;
    user: string;
}

const post = new Schema({
    commet: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String
    },
    user: { type:mongoose.Schema.Types.ObjectId,ref:'user' }
},{

    versionKey: false,
    timestamps: true
  
});

export let PostModel = model<IPost>('Post', post);