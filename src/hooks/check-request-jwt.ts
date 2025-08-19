import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

type JWTPayload = {
  sub: string; // User ID
  role: string; // User role
  iat: number; // Issued at time
}

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization

  if (!token) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    request.user = payload
  } catch (error) {
    return reply.status(401).send({ error });
  }
}