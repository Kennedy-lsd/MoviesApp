import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
} from "../controllers/userController";
import { handleRequest } from "../utils/middlewares/uuidHandler";
import verifyToken from "../utils/jwtAuth/jwt";
import upload from "../utils/multerConfig";
import validateUser from "../utils/middlewares/userValidation";
const router = Router();

router.get("/api/users", getAllUsers);

router.post("/api/users", upload.single('avatar'), validateUser, createUser);

router.get("/api/users/:id", handleRequest, getOneUser);

router.delete("/api/users/:id", handleRequest, deleteUser);

router.patch("/api/users/:id", handleRequest, updateUser);

router.post("/api/users/login", authenticateUser);

router.get("/api/users/status", verifyToken, getOneUser);

export default router;
