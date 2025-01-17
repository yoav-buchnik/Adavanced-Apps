import express, { Router } from "express";
import postsController from "../controllers/posts-controller";
import authenticate from "../common/auth_middleware";

const postsRoutes = (): Router => {
  const router = express.Router();

  router.get("/", authenticate, postsController.getAllPosts);
  router.get("/:id", authenticate, postsController.getPostById);
  router.put("/:id", authenticate, postsController.updatePost);
  router.delete("/:id", authenticate, postsController.deletePost);
  router.post("/", authenticate, postsController.createPost);

  return router;
};

export default postsRoutes;
