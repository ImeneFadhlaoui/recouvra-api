require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

let cookie;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await request(app).post('/api/auth/register')
        .send({ name: 'Test', email: 'agent@test.tn', password: 'Password1', role: 'agent' });
    const res = await request(app).post('/api/auth/login')
        .send({ email: 'agent@test.tn', password: 'Password1' });
    cookie = res.headers['set-cookie'];
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/clients', () => {
    it('doit créer un client', async () => {
        const res = await request(app)
            .post('/api/clients')
            .set('Cookie', cookie)
            .send({ name: 'Client Test', email: 'client@test.tn' });
        expect(res.statusCode).toBe(201);
        expect(res.body.client).toHaveProperty('name', 'Client Test');
    });

    it('doit refuser sans token', async () => {
        const res = await request(app)
            .post('/api/clients')
            .send({ name: 'Client Test', email: 'client2@test.tn' });
        expect(res.statusCode).toBe(401);
    });

    it('doit refuser si email manquant', async () => {
        const res = await request(app)
            .post('/api/clients')
            .set('Cookie', cookie)
            .send({ name: 'Client Sans Email' });
        expect(res.statusCode).toBe(400);
    });
});

describe('GET /api/clients', () => {
    it('doit retourner la liste des clients', async () => {
        const res = await request(app)
            .get('/api/clients')
            .set('Cookie', cookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.clients).toBeInstanceOf(Array);
    });
});