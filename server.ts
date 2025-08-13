// const fastify = require('fastify')
// const crypto = require('crypto')

import fastify from "fastify"
import crypto from "node:crypto"

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        traslateTime: "HH:MM:ss Z",
        ignore: "pid,hostname"
      }
    }
  }
})

const courses = [
  { id: "1", name: "JavaScript Basics" },
  { id: "2", name: "Advanced Node.js" },
  { id: "3", name: "React for Beginners" },
  { id: "4", name: "Full Stack Development" }
]

server.get("/courses", () => {
  return { courses }
})

server.get("/courses/:id", (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const course = courses.find(course => course.id === params.id)

  if (course) {
    return { course }
  }

  return reply.status(404).send()
})

server.post("/courses", (request, reply) => {
  type Body = {
    title: string
  }

  const body = request.body as Body

  const courseId = crypto.randomUUID()
  const courseTitle = body.title

  if (!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório" })
  }

  courses.push({ id: courseId, name: courseTitle })

  return reply.status(201).send({ message: "Course created successfully", courseId })
})

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server is running on port 3333")
})