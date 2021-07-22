import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../config";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.headers["authorization"];
  const token = refreshToken && refreshToken.split(" ")[1];
  if (!token || token == null) {
    return res.status(401).json({
      msg: "error",
    });
  }
  const decoded = await jwt.verify(token, process.env.JWTSECRET!, (err) => {
    if (err) {
      return res.sendStatus(401);
    }
  });
  next();
};

export default verifyAccessToken;
