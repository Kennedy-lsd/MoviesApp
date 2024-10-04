import { db } from "../drizzle/db";
import { VideoTable, ImagesForVideoTable } from "../schemas/video";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import VideoTableValidator from "../utils/validatorSchemas/videoTableValidator";
import { VideoType } from "../utils/types/types";



const getAllVideos = async (req: Request, res: Response) => {
  const { group } = req.query;

  const filters: { group?: string } = {};

  if (group) {
    filters.group = group as string; 
  }

  try {
    const query = db
      .select()
      .from(VideoTable)
      .leftJoin(ImagesForVideoTable, eq(VideoTable.imageId, ImagesForVideoTable.id));

    if (filters.group) {
      query.where(eq(VideoTable.group, filters.group)); 
    }

    const result = await query;

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const getOneVideo = async (req: Request, res: Response) => {
  const { id } = req.params as {id: string};

  if (!id) {
    return res.status(400).json({ message: "Invalid video id" });
  }

  try {
    const result = await db
      .select()
      .from(VideoTable)
      .where(eq(VideoTable.id, id));

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req: Request, res: Response) => {
  const videoData: VideoType = req.body;

  const validationResult = VideoTableValidator.safeParse(videoData);
  console.log(validationResult);

  if (!validationResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: validationResult.error.errors,
    });
  }
  try {
    const validatedData = validationResult.data;

    const newVideo = await db
      .insert(VideoTable)
      .values(validatedData)
      .returning();

    res.status(201).json(newVideo[0]);
  } catch (error: any) {
    console.error("Error creating video:", error);
    res.status(500).json({ error: "Failed to create video" });
  }
};

const deleteVideo = async (req: Request, res: Response) => {
  const { id } = req.params as {id: string};

  if (!id) {
    return res.status(400).json({ message: "Invalid video id" });
  }
  
  try {
    const deletedVideo = await db
      .delete(VideoTable)
      .where(eq(VideoTable.id, id))
      .returning();

    if (!deletedVideo.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Successfully delete" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req: Request, res: Response) => {
  const { id } = req.params as {id: string};
  const data: VideoType = req.body;
  try {
    const updatedVideo = await db
      .update(VideoTable)
      .set(data)
      .where(eq(VideoTable.id, id))
      .returning();

    if (!updatedVideo.length) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedVideo[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { 
  getAllVideos,
  createVideo, 
  deleteVideo, 
  getOneVideo, 
  updateVideo 
};
