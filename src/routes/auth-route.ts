import express, { Router } from "express";
import authController from "../controllers/auth-controller";
import authenticate from "common/auth_middleware";

const authRoutes = (): Router => {
  const router = express.Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/logout", authenticate, authController.logout);
  router.post("/refreshToken", authController.refreshToken);
  return router;
};

export default authRoutes;
