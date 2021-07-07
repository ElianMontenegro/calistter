import express from 'express';
import './config';
import './config/connectDB';
import passport from 'passport'
import passportMiddlewars from './middlewares/passport';
import passportGoogleMiddlewars from './middlewares/passportGoogle';
import UserRouter from './routes/user';
import postRouter from './routes/post';
import path from 'path';
const app = express();
app.set('port', process.env.PORT || 4000);

app.use('/uploads', express.static(path.resolve('uploads')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

passport.use(passportMiddlewars);
passport.use(passportGoogleMiddlewars);

app.use('/', UserRouter);
app.use('/post', postRouter);


export default app

