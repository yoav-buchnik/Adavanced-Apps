import express from "express";
import commentsController from "../controllers/comments-controller.js";

const commentsRoutes = () => {
  const router = express.Router();

  router.post("/", commentsController.createComment());
  router.get("/:id", commentsController.getCommentById());
  router.get("/", commentsController.getAllComments());
  router.put("/:id", commentsController.updateComment());
  router.delete("/:id", commentsController.deleteComment());


  return router;
};

export default commentsRoutes;