import { pgTable, text, uuid, uniqueIndex, timestamp, pgEnum } from "drizzle-orm/pg-core"

export const userRole = pgEnum("user_role", ["manager", "student"])

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default("student"),
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