const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { IUserDocument } from "../interfaces/IUserDocument";
import { UserModel  } from "../models/user";

const optsGoogle = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

export default new GoogleStrategy(
  optsGoogle,
  (accessToken: string, refreshToken: string, profile: any, done: any) => {
    console.log(profile);
    return done(null, profile)
    // UserModel.findOneAndUpdate(
    //   { googleId: profile.id },
    //   (err: string, user: any) => {
    //     return cb(err, user);
    //   },
    //   {new: true, upsert:true, rawResult: true}
    // );
  }
);
