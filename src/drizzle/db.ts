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

(async () => {
  try {
    await client`SELECT 1`; 
    console.log("Successfully connected to the database.");
  } catch (error: any) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
})();

const db = drizzle(client, { schema: combinedSchema, logger: true });

export { db };
