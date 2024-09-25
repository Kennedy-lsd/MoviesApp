import {
  getAllVideos,
  createVideo,
  deleteVideo,
  getOneVideo,
  updateVideo,
} from "../controllers/videoController";
import { Router } from "express";
import { handleRequest } from "../utils/middlewares/uuidHandler";

const router = Router();

router.get("/api/videos", getAllVideos);

router.post("/api/videos", createVideo);

router.delete("/api/videos/:id", handleRequest, deleteVideo);

router.get("/api/videos/:id", handleRequest, getOneVideo);

router.patch("/api/videos/:id", handleRequest, updateVideo);

export default router;
