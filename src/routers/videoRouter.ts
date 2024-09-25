import { getAllVideos, createVideo, deleteVideo, getOneVideo, updateVideo } from "../controllers/videoController";
import { Router } from "express";

const router = Router()


router.get("/api/videos", getAllVideos)

router.post("/api/videos", createVideo)

router.delete("/api/videos/:id", deleteVideo)

router.get("/api/videos/:id", getOneVideo)

router.patch("/api/videos/:id", updateVideo)

export default router