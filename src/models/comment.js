import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    sender: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model("Comment", commentSchema); 