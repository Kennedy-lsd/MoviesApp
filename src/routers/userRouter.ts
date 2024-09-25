import { Router } from "express";
import { getAllUsers, getOneUser, createUser, deleteUser, updateUser } from "../controllers/userController";
import { handleRequest } from "../utils/middlewares/uuidHandler";

const router = Router()

router.get("/api/users", getAllUsers)

router.post("/api/users", createUser)

router.get("/api/users/:id", handleRequest, getOneUser)

router.delete("/api/users/:id", handleRequest, deleteUser)

router.patch("/api/users/:id", handleRequest, updateUser)

export default router