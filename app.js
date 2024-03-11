import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
dotenv.config()


const app = express()


//DB connection
connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})
