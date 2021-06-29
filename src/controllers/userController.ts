import { Request, Response } from 'express';
import userDB from '../models/user';


class UserController {

    public async register(req: Request, res: Response) {
        const { username, email,password, phone } = req.body;
        
        const user = new userDB({username, email, password , phone})
        try {
            const resp = await user.save();
            res.json({
                data: resp
            })
        } catch (error) {
            console.log(error);
        }
        
        
    } 

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
    }

    


}

export const userController = new UserController();
