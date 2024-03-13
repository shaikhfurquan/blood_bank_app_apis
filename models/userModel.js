
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "organization", 'hospital', 'donar'],
        trim : true,
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'donar' || this.role === 'admin') {
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
        trim : true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim : true,
    },
    website: {
        type: String,
        trim : true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim : true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim : true,
    }

}, { timestamps: true })


const UserModel = mongoose.model('User', userSchema)

export default UserModel