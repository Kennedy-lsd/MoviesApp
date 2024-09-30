import { Router } from "express";
import { getAllUsers, getOneUser, createUser, deleteUser, updateUser, authenticateUser } from "../controllers/userController";
import { handleRequest } from "../utils/middlewares/uuidHandler";
import verifyToken from "../utils/jwtAuth/jwt";

const router = Router()

router.get("/api/users", getAllUsers)

router.post("/api/users", createUser)

router.get("/api/users/:id", verifyToken,  handleRequest, getOneUser)

router.delete("/api/users/:id", handleRequest, deleteUser)

router.patch("/api/users/:id", handleRequest, updateUser)

router.post("/api/users/login", authenticateUser)

export default router