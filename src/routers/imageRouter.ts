import { Router } from "express";
import {
  getAllImages,
  createImage,
  getOneImage,
  deleteImage,
  updateImage,
} from "../controllers/imageController";
import { handleRequest } from "../utils/middlewares/uuidHandler";

const router = Router();

router.get("/api/images", getAllImages);

router.post("/api/images", createImage);

router.get("/api/images/:id", handleRequest, getOneImage);

router.delete("/api/images/:id", handleRequest, deleteImage);

router.patch("/api/images/:id", handleRequest, updateImage);

export default router;
