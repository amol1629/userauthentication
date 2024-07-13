import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true
    },

    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true
    },

    address: {
        type: String,
        required: [true, "Please enter your address"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide your password']

    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPassword: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,


})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;