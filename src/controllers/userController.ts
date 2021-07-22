import { Request, Response } from "express";
import { UserModel } from "../models/user";
import jwt from "jsonwebtoken";
import { JWThelpers } from "../helpers/jwtHelpers";
import "../config";

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
        token: JWThelpers.createToken(user),
        refreshToken: JWThelpers.createrefreshToken(user),
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
        token: JWThelpers.createToken(user),
        refreshToken: JWThelpers.createrefreshToken(user),
      });
    } catch (error) {
      return res.status(500).json({
        msg: "error server" + error,
      });
    }
  }

  public async refreshToken(req: Request, res: Response) {
    const token: any = JWThelpers.verifyAccessToken(req, res);
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.REFRESHJWTSECRET!);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
    const user: any = await UserModel.findOne({ _id: payload.id });
    if (!user) {
      return res.sendStatus(401);
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.sendStatus(401);
    }

    return res.status(200).json({
      token: JWThelpers.createToken(user),
    });
  }

  public async logout(req: Request, res: Response) {
    const token: any = JWThelpers.verifyAccessToken(req, res);
    const payload: any = jwt.verify(token, process.env.REFRESHJWTSECRET!);
    if (await JWThelpers.revokeRefreshTokenByUser(payload.id)) {
      return res.sendStatus(204);
    }
    return res.status(401).json({
      msg: "unauthorized",
    });
  }
}

export const userController = new UserController();
