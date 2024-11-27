import express from "express";
import commentsController from "../controllers/comments-controller.js";

const commentsRoutes = () => {
  const router = express.Router();

  router.post("/", commentsController.createComment());
  router.get("/:id", commentsController.getCommentById());

  return router;
};

export default commentsRoutes;