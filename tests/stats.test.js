require('dotenv').config()

const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

let cookie
let clientId

beforeAll(async () => {

  await mongoose.connect(process.env.MONGODB_URI_TEST)

  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Stats Agent',
      email: 'stats@test.tn',
      password: 'Password1',
      role: 'agent'
    })

  const login = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'stats@test.tn',
      password: 'Password1'
    })

  cookie = login.headers['set-cookie']

  const client = await request(app)
    .post('/api/clients')
    .set('Cookie', cookie)
    .send({
      name: 'Stats Client',
      email: 'statsclient@test.tn'
    })

  clientId = client.body.client._id

  await request(app)
    .post('/api/invoices')
    .set('Cookie', cookie)
    .send({
      client: clientId,
      amount: 1000,
      dueDate: '2026-12-31',
      description: 'Stats invoice'
    })

})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Stats API', () => {

  it('should return system statistics', async () => {

    const res = await request(app)
      .get('/api/stats')
      .set('Cookie', cookie)

    expect(res.statusCode).toBe(200)

    expect(res.body).toHaveProperty('totalClients')
    expect(res.body).toHaveProperty('totalInvoices')
    expect(res.body).toHaveProperty('paidInvoices')
    expect(res.body).toHaveProperty('partialInvoices')
    expect(res.body).toHaveProperty('recoveredAmount')

  })

})