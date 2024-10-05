import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserStatus
} from "../controllers/userController";
import verifyToken from "../utils/jwtAuth/jwt";
import upload from "../utils/multerConfig";
import validateUser from "../utils/middlewares/userValidation";
const router = Router();

router.get("/api/users", getAllUsers);

router.post("/api/users", upload.single('avatar'), validateUser, createUser);

router.get("/api/users/:id",  getOneUser);

router.delete("/api/users/:id",  deleteUser);

router.patch("/api/users/:id",  updateUser);

router.post("/api/users/login", authenticateUser);

router.get("/api/users/login/status", upload.single('avatar'), verifyToken, getUserStatus);

export default router;
