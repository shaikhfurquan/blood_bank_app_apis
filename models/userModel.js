
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "organization", 'hospital', 'user']
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'user' || this.role === 'admin') {
                return true
            }
            return false
        }
    },
    organizationName: {
        type: String,
        required: function () {
            if (this.role === 'organization') {
                return true
            }
            return false
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        unique: [true, "Please provide a valid email address"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    }

}, { timestamps: true })


const UserModel = mongoose.model('User', userSchema)

export default UserModel