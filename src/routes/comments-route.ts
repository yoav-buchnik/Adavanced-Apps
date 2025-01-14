import express, { Router } from "express";
import commentsController from "../controllers/comments-controller";
import authenticate from "../common/auth_middleware";

const commentsRoutes = (): Router => {
  const router = express.Router();

  router.post("/", authenticate, commentsController.createComment);
  router.get("/:id", authenticate, commentsController.getCommentById);
  router.get("/", authenticate, commentsController.getAllComments);
  router.put("/:id", authenticate, commentsController.updateComment);
  router.delete("/:id", authenticate, commentsController.deleteComment);

  return router;
};

export default commentsRoutes;
