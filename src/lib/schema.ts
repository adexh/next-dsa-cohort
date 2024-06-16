import {
  timestamp,
  text,
  integer,
  pgSchema
} from "drizzle-orm/pg-core"

export const mySchema = pgSchema("dsacohort");

export const users = mySchema.table("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
  password: text('pass').notNull(),
  contact: integer('contact')
})