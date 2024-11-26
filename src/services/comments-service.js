import { Comment } from "../models/comment.js";
import { getPostById } from "./posts-service.js";

const createComment = async (commentData) => {
    const post = await getPostById(commentData.post);
    if(!post) {
        return undefined
    }
    return await Comment.create(commentData);
};


export default {
    createComment,
  };