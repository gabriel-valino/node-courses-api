
import { timestamp } from "drizzle-orm/pg-core"
import { uniqueIndex } from "drizzle-orm/pg-core"
import { text } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
})

export const courses = pgTable("courses", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull().unique(),
  description: text().notNull(),
})

export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid().notNull().references(() => users.id),
  courseId: uuid().notNull().references(() => courses.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, table => {
  return [uniqueIndex().on(table.userId, table.courseId)]
})