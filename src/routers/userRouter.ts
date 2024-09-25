import { Router } from "express";
import { getAllUsers, getOneUser } from "../controllers/userController";

const router = Router()

router.get("/api/users", getAllUsers)

router.get("/api/users/:id", getOneUser)

export default router