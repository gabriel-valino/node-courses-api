import fastify from "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    user?: {
      sub: string;
      role: string;
      iat: number;
    }
  }
}