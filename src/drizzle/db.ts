import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as userSchema from "../schemas/user";
import * as videoSchema from "../schemas/video";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const combinedSchema = {
  ...userSchema,
  ...videoSchema,
};

if (!process.env.DB_URL) {
  console.error("Error: DB_URL is not defined in the environment variables.");
  process.exit(1);
}

const client = postgres(process.env.DB_URL as string);
const db = drizzle(client, {schema: combinedSchema, logger: true})


export { db };
