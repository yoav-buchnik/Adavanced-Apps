import commentsService from "../services/comments-service.js";
import config from "../config/config.js";

const createComment = () => async (req, res) => {
    try {
        const commentData = {
          post: req.body.post,
          sender: req.body.sender,
          message: req.body.message,
        };

        // Check if all data available
        if (Object.values(commentData).every(Boolean)) {
          const data = await commentsService.createComment(commentData);
          res
          .status(data ? config.statusCode.SUCCESS : config.statusCode.NOT_FOUND)
          .json(data);
        } else {
          res
            .status(config.statusCode.BAD_REQUEST)
            .json("Incomplete comment data provided.");
        }
      } catch (error) {
        res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
      }
};

const getCommentById = () => async (req, res) => {
  try {
    const id = req.params.id;
    const data = await commentsService.getCommentById(id);
    res
      .status(data ? config.statusCode.SUCCESS : config.statusCode.NOT_FOUND)
      .json(data);
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export default {
    createComment,
    getCommentById,
};
