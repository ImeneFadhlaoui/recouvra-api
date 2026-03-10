require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

let cookie;
let invoiceId;
let paymentId;
let clientId;

beforeAll(async () => {

  await mongoose.connect(process.env.MONGODB_URI_TEST);
  
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Agent Test',
      email: 'agent@test.tn',
      password: 'Password1',
      role: 'agent'
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'agent@test.tn',
      password: 'Password1'
    });

  cookie = loginRes.headers['set-cookie'];

  const clientRes = await request(app)
    .post('/api/clients')
    .set('Cookie', cookie)
    .send({
      name: 'Client Payment',
      email: 'clientpayment@test.tn'
    });

  clientId = clientRes.body.client._id;

  const invoiceRes = await request(app)
    .post('/api/invoices')
    .set('Cookie', cookie)
    .send({
      client: clientId,
      amount: 500,
      dueDate: '2026-12-31',
      description: 'Invoice for payment test'
    });

  invoiceId = invoiceRes.body.invoice._id;

});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Payment API - Invoice relation', () => {

  it('should create payment for an invoice', async () => {

    const res = await request(app)
      .post(`/api/invoices/${invoiceId}/payments`)
      .set('Cookie', cookie)
      .send({
        amount: 100,
        method: 'cash'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.amount).toBe(100);

    paymentId = res.body._id;
  });

  it('should update invoice amountPaid after payment', async () => {

    const res = await request(app)
      .get(`/api/invoices/${invoiceId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.amountPaid).toBe(100);
    expect(res.body.status).toBe('partial');

  });

  it('should get all payments', async () => {

    const res = await request(app)
      .get('/api/payments')
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it('should get payment by id', async () => {

    const res = await request(app)
      .get(`/api/payments/${paymentId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(paymentId);

  });

  it('should delete payment', async () => {

    const res = await request(app)
      .delete(`/api/payments/${paymentId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(200);

  });

});