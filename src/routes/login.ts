// Isaac34@hotmail.com

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { users } from '../db/schema.ts'
import z from 'zod'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { verify } from 'argon2'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/sessions", {
    schema: {
      tags: ['auth'],
      summary: 'Login',
      description: 'This endpoint allows users to log in by providing their email and password.',
      body: z.object({
        email: z.email(),
        password: z.string(),
      }),
      response: {
        200: z.object({
          token: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (request, reply) => {

    const { password, email } = request.body

    const reuslt = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (reuslt.length === 0) {
      return reply.status(400).send({ message: "Credentials are invalid" })
    }

    const user = reuslt[0]

    const doesPasswordMatch = await verify(user.password, password)

    if (!doesPasswordMatch) {
      return reply.status(400).send({ message: "Credentials are invalid" })
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables')
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)

    return reply.status(200).send({ token })
  })
}