import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.DRIZZLE_DATABASE_URL,
});

export const db = drizzle(client, { logger: true });