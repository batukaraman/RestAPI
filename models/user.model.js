import mongoose from "mongoose";

const User = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('user', User);