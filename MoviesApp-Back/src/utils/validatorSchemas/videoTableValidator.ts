import { z } from "zod";

const VideoTableValidator = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  description: z.string().min(1, "Description is required"),
  group: z.string().min(1, "Required"),
  imageId: z.string().uuid(),
});


export default VideoTableValidator