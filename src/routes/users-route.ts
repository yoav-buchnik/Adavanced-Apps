import express, { Router } from "express";
import usersController from "../controllers/users-controller";

const usersRoutes = (): Router => {
  const router = express.Router();

  router.get("/", usersController.getAllUsers);
  router.get("/:id", usersController.getUserById);
  router.put("/:id", usersController.updateUser);
  router.delete("/:id", usersController.deleteUser);
  router.post("/", usersController.createUser);

  return router;
};

export default usersRoutes;
