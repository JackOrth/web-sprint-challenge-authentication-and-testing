const request = require('supertest')
const db = require('../data/dbConfig')
const server = require ('../api/server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {
  it('should return a 201 OK Status', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'Jack', password: 'password'})
    expect(res.status).toBe(201)
  })
  it('responds with a 401 if no payload', async () => {
    const res = await request(server).post('/api/auth/register').send({})
    expect(res.status).toBe(401)
  })
})
describe('[POST] /login', () => {
  it('returns a status 401 if credential invalid', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'invalid', password: 'credentials'})
    expect(res.status).toBe(401)
  })
  it('responds with a  if credential invalid', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'invalid', password: 'credentials'})
    expect(res.body.message).toBe('Invalid credentials')
  })
})
