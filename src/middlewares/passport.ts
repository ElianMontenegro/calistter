import { config } from 'dotenv'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import  {UserModel,  IUserModel} from '../models/user';

const optsJWT: StrategyOptions = {
    jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWTSECRET || "7df3f6727b0e93c5eb6331755a1b3e9f"
}


export default new Strategy(optsJWT,async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
    }
})

