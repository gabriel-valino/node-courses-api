import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app'
import { makeUser } from '../tests/factories/make-user'

test('login', async () => {
  await server.ready()

  const { user, passwordBeforeHash } = await makeUser()

  const respose = await request(server.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({
      email: user.email,
      password: passwordBeforeHash,
    })

  expect(respose.statusCode).toBe(200)
  expect(respose.body).toEqual({
    token: expect.any(String),
  })
})