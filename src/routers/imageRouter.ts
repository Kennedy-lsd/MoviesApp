import { Router } from "express";
import {
  getAllImages,
  createImage,
  getOneImage,
  deleteImage,
  updateImage,
} from "../controllers/imageController";
import upload from "../utils/multerConfig";
import validateImage from "../utils/middlewares/imageValidation";

const router = Router();

router.get("/api/images", getAllImages);

router.post("/api/images",upload.single('image'), validateImage, createImage);

router.get("/api/images/:id",  getOneImage);

router.delete("/api/images/:id",  deleteImage);

router.patch("/api/images/:id", upload.single('image'),  updateImage);

export default router;
