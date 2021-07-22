import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "../config";
import { UserModel, IUserModel } from "../models/user";

class JWTHelpers {
  public createToken(user: IUserModel) {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTSECRET!,
      {
        expiresIn: 120,
        algorithm: "HS256",
        issuer: process.env.URL,
      }
    );
  }

  public createrefreshToken(user: IUserModel) {
    return jwt.sign(
      { id: user._id, email: user.email, tokenVersion: user.tokenVersion },
      process.env.REFRESHJWTSECRET!,
      {
        expiresIn: "7d",
        algorithm: "HS256",
        issuer: process.env.URL,
      }
    );
  }

  public async revokeRefreshTokenByUser(userId: any): Promise<Boolean> {
    if (
      !(await UserModel.updateOne(
        { _id: userId },
        { $inc: { tokenVersion: 1 } }
      ))
    ) {
      return false;
    }
    return true;
  }

  public verifyAccessToken(req: Request, res: Response): Response<string> | string {
    const refreshToken = req.headers["authorization"];
    const token : string = refreshToken! && refreshToken.split(" ")[1];
    if (!token || token == null) {
      return res.status(401).json({
        msg: "error",
      });
    }
    return token
  }
}

export const JWThelpers = new JWTHelpers();
