import { Request, Response } from 'express';
import {UserModel, IUserModel} from '../models/user';
import { PostModel, IPost } from '../models/post';

class PostController {

    public async create(req: Request, res: Response){
        const { commet, user } = req.body;
        const imagePath = req.file?.path 
        const post = new PostModel({
            imagePath:imagePath,
            commet:commet,
            user:user
        })
        try {
            const postCreate = await post.save();
            const userById = await UserModel.findById(user);
            if (userById) {
                userById.posts.push(postCreate);
                await userById.save();
            }
            return res.status(201).json({
                postCreate,
                userById
            })
        } catch (error) {
            return res.status(400).json({
                message: `error ${error}` 
            })
        }
    }
}


export const postController = new PostController();
