import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { courses, enrollments } from '../db/schema.ts'
import z from 'zod'
import { and, asc, count, eq, ilike, SQL } from 'drizzle-orm'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/courses", {
    schema: {
      tags: ['courses'],
      summary: 'Get all courses',
      querystring: z.object({
        search: z.string().optional(),
        orderBy: z.enum(['title', 'id']).optional().default("title"),
        page: z.coerce.number().optional().default(1),
      }),
      response: {
        200: z.object({
          courses: z.array(z.object({
            id: z.uuid(),
            title: z.string(),
            enrollments: z.number()
          })),
          total: z.number().describe('Total number of courses found')
        })
      }
    }
  }, async (request, reply) => {
    const { search, orderBy, page } = request.query

    const conditions: SQL[] | undefined = []

    if (search) {
      conditions.push(ilike(courses.title, `%${search}%`))
    }

    const [result, total] = await Promise.all([
      db
        .select({
          id: courses.id,
          title: courses.title,
          enrollments: count(enrollments.id)
        })
        .from(courses)
        .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
        .orderBy(asc(courses[orderBy]))
        .offset((page - 1) * 2)
        .limit(10)
        .where(
          and(...conditions)
        )
        .groupBy(courses.id),
      db.$count(courses, ...conditions)
    ])

    return reply.send({ courses: result, total })
  })
}