import express from 'express';
import userRuter from './src/routes/user';
import './config';
import db from './src/config/connectDB';

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/', userRuter);

app.listen(port, ()=>{
    console.log(`server ready on port:${process.env.PORT}` );
});
