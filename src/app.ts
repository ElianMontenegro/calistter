import express from 'express';
import './config';
import './config/connectDB';
import passport from 'passport'
import passportMiddlewars from './middlewares/passport';
import passportGoogleMiddlewars from './middlewares/passportGoogle';
import UserRouter from './routes/user';

const app = express();
app.set('port', process.env.PORT || 3000);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passport.use(passportMiddlewars);
passport.use(passportGoogleMiddlewars);
app.use('/', UserRouter);


export default app

