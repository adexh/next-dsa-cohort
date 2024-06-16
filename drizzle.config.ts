import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "src/lib/schema.ts",
  schemaFilter: ["dsacohort"],
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials :{
    url: process.env.DRIZZLE_DATABASE_URL as string
  }
})