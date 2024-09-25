import dotenv from "dotenv" 
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

dotenv.config();

const migrationClient = postgres(process.env.DB_URL as string, { max: 1 });

async function migrationCommand() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: "./src/drizzle/migrations"
    })
    await migrationClient.end()
}

migrationCommand()

