import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
dotenv.config()


const app = express()

const PORT = process.env.PORT || 3500

//express middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


//routes
app.use('/api/users' , userRouter)


//DB connection
connectDB()

app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`);
})
