import { text } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
})

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text().notNull().unique(),
  description: text().notNull(),
})