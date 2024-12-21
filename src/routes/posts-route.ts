import express, { Router } from "express";
import postsController from "../controllers/posts-controller";

const postsRoutes = (): Router => {
  const router = express.Router();

  router.get("/", postsController.getAllPosts);
  router.get("/:id", postsController.getPostById);
  router.put("/:id", postsController.updatePost);
  router.delete("/:id", postsController.deletePost);
  router.post("/", postsController.createPost);

  return router;
};

export default postsRoutes;
