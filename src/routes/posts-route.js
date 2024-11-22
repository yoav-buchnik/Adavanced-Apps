import express from "express";

const postsRoutes = () => {
  const router = express.Router();

  router.get("/", (req, res) => res.send("Hello World! - posts"));

  return router;
};

export default postsRoutes;
