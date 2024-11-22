import postsService from "../services/posts-service.js";
import config from "../config/config.js";

const getAllPosts = () => async (req, res) => {
  try {
    const data = await postsService.getAllPosts();
    res.status(config.statusCode.SUCCESS).json(data);
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const getPostById = () => async (req, res) => {
  return "Needs implementation";
};

const getPostBySender = () => async (req, res) => {
  return "Needs implementation";
};

const createPost = () => async (req, res) => {
  return "Needs implementation";
};

const deletePost = () => async (req, res) => {
  return "Needs implementation";
};

const updatePost = () => async (req, res) => {
  return "Needs implementation";
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  getPostBySender,
};
