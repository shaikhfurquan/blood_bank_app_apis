import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import morgan from 'morgan';
dotenv.config()


const app = express()

//express middlewares
app.use(express.json())
app.use(morgan('dev'))

//DB connection
connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})
