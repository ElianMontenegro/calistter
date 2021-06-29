import { Request, Response } from 'express';
import userDB from '../models/user';


class UserController {

    public async register(req: Request, res: Response) {
        const { username, email, role, password, date , phone } = req.body;
        console.log(username, email, role, password, date, phone);

    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log( email, password);

    }

    


}

export const userController = new UserController();
