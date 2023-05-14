import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model('post', Post);