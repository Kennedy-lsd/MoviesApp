import { z } from "zod";

const userTableValidator = z.object({
  id: z.string().uuid().optional(),
  avatar: z.string().min(1, "Avatar is reqiured"),
  email: z.string().email("@ is missing"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(10, "Password must be shorter than 11 symbols"),
});

export default userTableValidator