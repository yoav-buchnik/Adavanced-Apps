import postsService from "../services/posts-service.js";
import config from "../config/config.js";

const getAllPosts = () => async (req, res) => {
  try {
    const sender = req.query.sender;
    const data = await postsService.getAllPosts(sender);
    res.status(config.statusCode.SUCCESS).json(data);
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const getPostById = () => async (req, res) => {
  try {
    const id = req.params.id;
    const data = await postsService.getPostById(id);
    res
      .status(data ? config.statusCode.SUCCESS : config.statusCode.NOT_FOUND)
      .json(data);
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const createPost = () => async (req, res) => {
  try {
    const postData = {
      sender: req.body.sender,
      content: req.body.content,
    };

    // Check if all data available
    if (Object.values(postData).every(Boolean)) {
      const data = await postsService.createPost(postData);
      res.status(config.statusCode.SUCCESS).json(data);
    } else {
      res
        .status(config.statusCode.BAD_REQUEST)
        .json("Incomplete post data provided.");
    }
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
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
};
