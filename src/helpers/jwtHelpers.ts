import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "../config";
import { UserModel, IUserModel } from "../models/user";

module.exports = {
    async createToken(user: IUserModel , req: Request , res : Response) { 
        const payload : Object = {
            id: user._id, 
            email: user.email
        }
        const secret : string = process.env.JWTSECRET || "7df3323232321111e9f";
        const options : Object = {
            expiresIn: 15,
            algorithm: "HS256",
            issuer: process.env.URL,
        }
        await jwt.sign(payload,secret,options, (err, token) => {
            if (err) {
               return res.sendStatus(401);
            }
            return res.status(201).json({
                token
            })
        });
  },
  async createrefreshToken(user: IUserModel, req: Request , res : Response) {
    const payload : Object = {
        id: user._id, 
        email: user.email
    }
    const secret : string = process.env.REFRESHJWTSECRET || "1df3323232321111e9f";
    const options : Object = {
        expiresIn: '1y',
        algorithm: "HS256",
        issuer: process.env.URL,
    }
    await jwt.sign(payload,secret,options, (err, token) => {
        if (err) {
           return res.sendStatus(401);
        }
        return res.status(201).json({
            token
        })
    });
  }
}