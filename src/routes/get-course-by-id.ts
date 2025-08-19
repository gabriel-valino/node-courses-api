import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { courses } from '../db/schema.ts'
import z from 'zod'
import { desc, eq } from 'drizzle-orm'
import { checkRequestJWT } from '../hooks/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '../utils/get-authenticated-user-from-request.ts'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/courses/:id", {
    preHandler: [
      checkRequestJWT
    ],
    schema: {
      params: z.object({
        id: z.uuid({ message: "Must be a valid uuid" })
      }),
      tags: ['courses'],
      summary: 'Get course by ID',
      response: {
        200: z.object({
          course: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string().nullable()
          })
        }),
        404: z.null().describe('Course not found'),
      }
    }
  }, async (request, reply) => {
    const user = getAuthenticatedUserFromRequest(request)

    type Params = {
      id: string
    }

    const params = request.params as Params

    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, params.id))


    if (result.length > 0) {
      return { course: result[0] }
    }

    return reply.status(404).send()
  })
}