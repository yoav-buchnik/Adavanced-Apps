import express, { Router } from "express";
import commentsController from "../controllers/comments-controller";

const commentsRoutes = (): Router => {
  const router = express.Router();

  router.post("/", commentsController.createComment);
  router.get("/:id", commentsController.getCommentById);
  router.get("/", commentsController.getAllComments);
  router.put("/:id", commentsController.updateComment);
  router.delete("/:id", commentsController.deleteComment);

  return router;
};

export default commentsRoutes;
