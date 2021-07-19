import { config } from 'dotenv'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { UserModel } from '../models/user';

const optsJWT: StrategyOptions = {
    jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWTSECRET || "7df3323232321111e9f",
}

export const tokenStrategy = new Strategy(optsJWT,async (payload, done) => {
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

