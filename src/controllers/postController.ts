import { Request, Response } from "express";
import { UserModel, IUserModel } from "../models/user";
import { PostModel, IPost } from "../models/post";
import { JWThelpers } from "../helpers/jwtHelpers";
import jwt from "jsonwebtoken";

class PostController {
  public async create(req: Request, res: Response) {
    const token: any = JWThelpers.verifyAccessToken(req, res);
    let payload : any = jwt.verify(token, process.env.JWTSECRET!);
    const { commet } = req.body;
    const imagePath = req.file?.path;
    const post = new PostModel({
      imagePath: imagePath,
      commet: commet,
      user: payload.id,
    });
    try {
      const postCreate = await post.save();
      const userById = await UserModel.findById(payload.id);
      if (userById) {
        userById.posts.push(postCreate);
        await userById.save();
      }
      return res.status(201).json({
        postCreate,
        userById,
      });
    } catch (error) {
      return res.status(400).json({
        message: `error ${error}`,
      });
    }
  }

  public async getPost(req: Request, res: Response) {
    try {
      const posts = await PostModel.find();
      if (!posts) {
        return res.status(404).json({
          msg: "there are not any post",
        });
      }

      return res.status(200).json({
        posts,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "bad request",
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const data = await PostModel.findByIdAndDelete(id);

      if (!data) {
        return res.status(404).json({
          msg: "post not  found",
        });
      }
      return res.status(204).json({
        msg: "success",
      });
    } catch (error) {
      return res.status(500).json({
        msg: `internal server error  ${error}`,
      });
    }
  }
}

export const postController = new PostController();
