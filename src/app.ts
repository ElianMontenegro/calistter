import express from 'express';
import '../config';
import './config/connectDB';
const app = express();
const port = process.env.PORT || 3000;
const UserRouter = require('./routes/user');



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', UserRouter);

app.listen(port, ()=>{
    console.log(`server ready on port:${process.env.PORT}` );
});
