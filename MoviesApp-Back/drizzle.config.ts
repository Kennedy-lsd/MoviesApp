import { defineConfig } from "drizzle-kit";
import dotnev from 'dotenv'

dotnev.config()

export default defineConfig({
  schema: ["./src/schemas/user.ts", "./src/schemas/video.ts"],
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  verbose: true,
  strict: true,
});
