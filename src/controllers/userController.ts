import { Request, Response } from 'express';
import userDB from '../models/user';


class UserController {

    public async register(req: Request, res: Response) {
        const { username, email, role, password, date , phone } = req.body;
        const user = new userDB({username, email, password})
        const resp = await user.save();
    } 

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
    }

    


}

export const userController = new UserController();
