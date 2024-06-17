import {
  timestamp,
  text,
  integer,
  serial,
  varchar,
  pgSchema,
  json
} from "drizzle-orm/pg-core"

export const mySchema = pgSchema("dsacohort");

export const users = mySchema.table("user", {
  id: serial("id")
    .primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
  password: text('pass').notNull(),
  contact: text('contact').notNull()
})

export const jsonData = mySchema.table("jsondata", {
  id: serial("id").primaryKey(),
  data_type : varchar("data_type", {length: 50}),
  data : json('data'),
})

export const allowedEmails = mySchema.table("allowedEmails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull()
})