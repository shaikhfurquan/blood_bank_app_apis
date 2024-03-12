import UserModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) =>{
    try {
        // check if the user is already registered 
        const existingUser = await UserModel.findOne({email : req.body.email})
        if(existingUser){
            return  res.status(200).json({
                success : false,
                message : "User already registered, please login"
            })
        }
        // hashing the password
        const hashedPassword = await bcrypt.hash(req.body.password , 10)
        
        // replacing the plain password to hash password
        req.body.password = hashedPassword
        const user = await UserModel.create(req.body)

        res.status(201).json({
            success : true,
            message : "User registered successfully",
            user : user
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while registering user",
            error : error.message
        })
    }
}