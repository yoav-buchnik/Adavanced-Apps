import { Comment } from "../models/comment.js";
import { getPostById } from "./posts-service.js";
import mongoose from "mongoose";

const createComment = async (commentData) => {
    const post = await getPostById(commentData.post);
    if(!post) {
        return undefined
    }
    return await Comment.create(commentData);
};

const getCommentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return undefined;
    }
    return await Comment.findById(id) ?? undefined;;
};

export default {
    createComment,
    getCommentById,
  };