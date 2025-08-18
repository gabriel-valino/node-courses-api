import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course'

test('get a course by id', async () => {
  await server.ready()

  const course = await makeCourse()

  const respose = await request(server.server)
    .get(`/courses/${course.id}`)

  expect(respose.statusCode).toBe(200)
  expect(respose.body).toEqual({
    course: {
      title: expect.any(String),
      id: expect.any(String),
      description: expect.any(String)
    }
  })
})

test('return 404 for non existing courses', async () => {
  await server.ready()

  const respose = await request(server.server)
    .get("/courses/66842c9a-5119-40c3-9827-b07222e495fd")

  expect(respose.statusCode).toBe(404)
}) 