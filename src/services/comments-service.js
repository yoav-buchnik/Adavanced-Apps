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

const getAllComments = async (post) => {
  if (post) {
    return await Comment.find({ post });
  }
  return await Comment.find({});
};

const updateComment = async (id, content) => {
  const comment = await getCommentById(id);

  if (comment) {
    comment.content = content;
    await comment.save();
  }

  return comment;
};

export default {
    createComment,
    getCommentById,
    getAllComments,
    updateComment,
  };