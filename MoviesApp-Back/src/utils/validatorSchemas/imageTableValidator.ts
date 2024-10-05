import { z } from "zod";

const imageTableValidator = z.object({
  id: z.string().uuid().optional(),
  image: z.string().min(1, "Image is required")
});

export default imageTableValidator;
