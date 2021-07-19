import express from 'express';
import path from 'path';
import cors from 'cors'

import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import  { option }  from './swaggerOptions'

import './config';
import './config/connectDB';
import passport from 'passport'
import { tokenStrategy } from './middlewares/passport';
import passportGoogleMiddlewars from './middlewares/passportGoogle';
import UserRouter from './routes/user';
import postRouter from './routes/post';

const app = express();

app.set('port', process.env.PORT || 5000);

app.use('/uploads', express.static(path.resolve('uploads')));


var corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

passport.use('jwt', tokenStrategy);
passport.use(passportGoogleMiddlewars);

app.use('/', UserRouter);
app.use('/api/post', postRouter);

const specs = swaggerJsDoc(option);
app.use('/docs', swaggerUI.serve , swaggerUI.setup(specs));


export default app

