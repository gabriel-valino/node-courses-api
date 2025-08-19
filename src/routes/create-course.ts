
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { courses } from '../db/schema.ts'
import z from 'zod'
import { checkRequestJWT } from '../hooks/check-request-jwt.ts'
import { checkUserRole } from '../hooks/check-user-role.ts'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/courses", {
    preHandler: [
      checkRequestJWT,
      checkUserRole('manager')
    ],
    schema: {
      tags: ['courses'],
      summary: 'Create a new course',
      description: 'This endpoint allows you to create a new course with a title.',
      body: z.object({
        title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
        description: z.string().min(5, { message: "Description must be at least 5 characters long" })
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Course created successfully'),
      }
    }
  }, async (request, reply) => {

    const body = request.body

    const courseTitle = body.title
    const courseDescription = body.description

    const reuslt = await db
      .insert(courses)
      .values({
        description: courseDescription,
        title: courseTitle,
      })
      .returning()

    return reply.status(201).send({ courseId: reuslt[0].id })
  })
}