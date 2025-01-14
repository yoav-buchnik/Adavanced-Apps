import express, { Router } from "express";
import usersController from "../controllers/users-controller";
import authenticate from "../common/auth_middleware";

const usersRoutes = (): Router => {
  const router = express.Router();

  router.get("/", authenticate, usersController.getAllUsers);
  router.get("/:id", authenticate, usersController.getUserById);
  router.put("/:id", authenticate, usersController.updateUser);
  router.delete("/:id", authenticate, usersController.deleteUser);
  router.post("/", authenticate, usersController.createUser);

  return router;
};

export default usersRoutes;
