import { Request, Response } from 'express';
import {UserModel, IUserModel} from '../models/user';
import jwt from 'jsonwebtoken'
import  '../config';


function createToken(user: IUserModel) {
    return jwt.sign({id: user._id, email: user.email},process.env.JWTSECRET || "7df3f6721234567955a1b3e9f", {
        expiresIn: 86400
    });
}


class UserController {

    public async register(req: Request, res: Response) {
        const { username, email, password, phone } = req.body;
        if (!(username || email || password || phone)) {
            return res.status(400).json({msg: 'fields empty'})
        }
        
        const user = await UserModel.findOne({email: email})
        if (user) {
            return res.status(400).json({msg: 'this email already exist'});
        }

        const newUser = new UserModel({username, email, password, phone})
        try {
            const resp = await newUser.save();
            res.json({
                data: resp
            })
        } catch (error) {
            console.log(error);
        }
    } 

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!(email || password)) {
            return res.status(400).json({msg: 'fields empty'})
        }
        
        const user = await UserModel.findOne({email: email})
        if (!user) {
            return res.status(400).json({msg: 'this user does not exists'});
        }
        const isMatch = user.comparePassword("password");
        
        if (isMatch) {
            return res.status(200).json({token: createToken(user)})
        }
        return res.status(400).json({
            msg: 'the email or password are incorrect'
        });
    }
    


}

export const userController = new UserController();
