import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const client = new Client({
  connectionString: process.env.DRIZZLE_DATABASE_URL,
});
client.connect();

export const db = drizzle(client, { logger: true });