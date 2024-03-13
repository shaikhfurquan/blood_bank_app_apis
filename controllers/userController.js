import { generateToken } from "../helper/generateToken.js"
import UserModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'


export const registerUser = async (req, res) => {
    try {
        // check if the user is already registered 
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already registered, please login"
            })
        }
        // hashing the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // replacing the plain password to hash password
        req.body.password = hashedPassword
        const user = await UserModel.create(req.body)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while registering user",
            error: error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        // check if user is exists or not
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, register first",
            })
        }
        // if user is there and we will verify his password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // if everything works fine after that we will generate the token
        const token = generateToken(user)
        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`,
            token: token,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        console.log(req.user);
        //finding the user
        const user = await UserModel.findOne({ _id: req.user.id }).select('-password')
        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching the current user",
            error: error.message
        })
    }
}

