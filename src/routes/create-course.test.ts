import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app'
import { faker } from '@faker-js/faker'

test('create a course', async () => {
  await server.ready()

  const respose = await request(server.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .send({
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(3),
    })

  expect(respose.statusCode).toBe(201)
  expect(respose.body).toEqual({
    courseId: expect.any(String)
  })
}) 