import { Post } from "../models/Post.js";
import mongoose from "mongoose";

const getAllPosts = async () => {
  return await Post.find({});
};

const getPostById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return undefined;
  }
  return await Post.findById(id);
};

const createPost = async (postData) => {
  return await Post.create(postData);
};

const updatePost = async (id, postData) => {
  return "Needs implementation";
};

const deletePost = async (id) => {
  return "Needs implementation";
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
