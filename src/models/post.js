import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  sender: String,
  content: String,
});

export const Post = mongoose.model("Post", postSchema);
