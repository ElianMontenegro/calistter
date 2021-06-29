const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
require('dotenv').config()
const db = require('./config/connectDB');

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.listen(port, ()=>{
    console.log('server ready');
});
