import express from "express";
import postsController from "../controllers/posts-controller.js";

const postsRoutes = () => {
  const router = express.Router();

  router.get("/", postsController.getAllPosts());
  router.post("/", postsController.createPost());

  return router;
};

export default postsRoutes;
