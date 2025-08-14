
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { courses } from '../db/schema.ts'
import z from 'zod'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/courses", {
    schema: {
      tags: ['courses'],
      summary: 'Create a new course',
      description: 'This endpoint allows you to create a new course with a title.',
      body: z.object({
        title: z.string().min(5, { message: "Title must be at least 5 characters long" })
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Course created successfully'),
      }
    }
  }, async (request, reply) => {
    type Body = {
      title: string
    }

    const courseTitle = request.body.title

    const reuslt = await db
      .insert(courses)
      .values({
        description: "Some description",
        title: courseTitle,
      })
      .returning()

    return reply.status(201).send({ courseId: reuslt[0].id })
  })
}