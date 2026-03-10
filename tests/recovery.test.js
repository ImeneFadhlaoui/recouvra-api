require('dotenv').config()

const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

let cookie
let clientId
let invoiceId
let recoveryId

beforeAll(async () => {

  await mongoose.connect(process.env.MONGODB_URI_TEST)

  // register
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Recovery Agent',
      email: 'recovery@test.tn',
      password: 'Password1',
      role: 'agent'
    })

  // login
  const login = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'recovery@test.tn',
      password: 'Password1'
    })

  cookie = login.headers['set-cookie']

  // create client
  const client = await request(app)
    .post('/api/clients')
    .set('Cookie', cookie)
    .send({
      name: 'Recovery Client',
      email: 'clientrecovery@test.tn'
    })

  clientId = client.body.client._id

  // create invoice
  const invoice = await request(app)
    .post('/api/invoices')
    .set('Cookie', cookie)
    .send({
      client: clientId,
      amount: 800,
      dueDate: '2026-12-31',
      description: 'Recovery test invoice'
    })

  invoiceId = invoice.body.invoice._id

})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Recovery API', () => {

  it('should create recovery action linked to invoice', async () => {

    const res = await request(app)
      .post('/api/recovery')
      .set('Cookie', cookie)
      .send({
        invoice: invoiceId,
        type: 'call',
        description: 'Client contacted by phone'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.invoice).toBe(invoiceId)

    recoveryId = res.body._id

  })

  it('should get all recovery actions', async () => {

    const res = await request(app)
      .get('/api/recovery')
      .set('Cookie', cookie)

    expect(res.statusCode).toBe(201)
    expect(Array.isArray(res.body)).toBe(true)

  })

  it('should get recovery by id', async () => {

    const res = await request(app)
      .get(`/api/recovery/${recoveryId}`)
      .set('Cookie', cookie)

    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(recoveryId)

  })

  it('should update recovery type', async () => {

    const res = await request(app)
      .patch(`/api/recovery/${recoveryId}`)
      .set('Cookie', cookie)
      .send({
        type: 'email'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.type).toBe('email')

  })

  it('should delete recovery', async () => {

    const res = await request(app)
      .delete(`/api/recovery/${recoveryId}`)
      .set('Cookie', cookie)

    expect(res.statusCode).toBe(200)

  })

})  