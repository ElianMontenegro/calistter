import mongoose, { Schema, Model, model, ObjectId, Document } from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import { IUserDocument } from "../interfaces/IUserDocument";
const salt: number = 10;

export interface IUserModel extends IUserDocument {
  isModified(password: string): boolean;
  comparePassword: (password: string) => boolean;
}

let schema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 32,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 10,
    max: 320,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: Number,
    minlength: 10,
    unique: true,
  },
}).pre<IUserDocument>("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
  }
})
schema.methods.comparePassword = async function comparePassword(data) {
  return bcrypt.compare(data, this.password);
}


export let UserModel = mongoose.model<IUserModel>(
  "user",
  schema,
  "users",
  true
);

