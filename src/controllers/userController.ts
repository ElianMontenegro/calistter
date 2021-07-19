import { Request, Response } from "express";
import { UserModel, IUserModel } from "../models/user";
import jwt from "jsonwebtoken";
import passport  from "passport";
import "../config";

function createToken(user: IUserModel) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWTSECRET || "7df3323232321111e9f",
    {
      expiresIn: 15,
      algorithm: "HS256",
      issuer: process.env.URL,
    }
  );
}

function createrefreshToken(user: IUserModel) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESHJWTSECRET || "7df32323232329f",
    {
      expiresIn: 22222,
      algorithm: "HS256",
      issuer: process.env.URL,
    }
  );
}

class UserController {
  public async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!(username || email || password)) {
      return res.status(400).json({ msg: "fields empty" });
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "this email already exist" });
    }

    const newUser = new UserModel({ username, email, password });
    try {
      const user = await newUser.save();
      res.status(201).json({
        token: createToken(user),
        refreshToken: createrefreshToken(user),
      });
    } catch (error) {
      return res.status(500).json({
        msg: `error ${error}`,
      });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res.status(400).json({ msg: "fields empty" });
    }
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ msg: "this user does not exists" });
      }
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "invalid passport",
        });
      }
      return res.status(200).json({
        token: createToken(user),
        refreshToken: createrefreshToken(user),
      });
    } catch (error) {
      return res.status(500).json({
        msg: "error server" + error,
      });
    }
  }

  public async refreshToken(req: Request, res: Response) {
    const refreshToken = req.headers['authorization']
    const token = refreshToken && refreshToken.split(' ')[1]
    if(!(token) || token == null) {
        res.status(401).json({
          msg: 'error'
        })
    }
    const verifyToken : any = jwt.verify(token || "" ,process.env.REFRESHJWTSECRET || "", (err, user)  => {
      if(err) return err;
      return user;
    });
    const id = verifyToken.id;
    console.log(id);
    
    try {
      const user = await UserModel.findById(id)
      if(!user){
        return res.sendStatus(404)
      }
      return res.status(200).json({
        token: createToken(user),
      });
    } catch (error) {
      return res.sendStatus(500);
    }
    

  }
}

export const userController = new UserController();
