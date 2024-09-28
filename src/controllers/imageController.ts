import { ImagesForVideoTable } from "../schemas/video";
import imageTableValidator from "../utils/validatorSchemas/imageTableValidator";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { ImageData } from "../utils/types/types";

const getAllImages = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(ImagesForVideoTable);

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOneImage = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const result = await db
      .select()
      .from(ImagesForVideoTable)
      .where(eq(ImagesForVideoTable.id, id));

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result[0]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createImage = async (req: Request, res: Response) => {
  const data: ImageData = req.body;

  const validationResult = imageTableValidator.safeParse(data);

  if (!validationResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: validationResult.error.errors,
    });
  }
  try {
    const validatedData = validationResult.data;
    const newImage = await db
      .insert(ImagesForVideoTable)
      .values(validatedData)
      .returning();
    res.status(200).json(newImage[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const result = await db
      .delete(ImagesForVideoTable)
      .where(eq(ImagesForVideoTable.id, id))
      .returning();

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Successfully delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const data: ImageData = req.body;
  try {
    const result = await db
      .update(ImagesForVideoTable)
      .set(data)
      .where(eq(ImagesForVideoTable.id, id))
      .returning();

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export { getAllImages, createImage, getOneImage, deleteImage, updateImage };
