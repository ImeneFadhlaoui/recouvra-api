const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

let cookie;
let clientId;

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/recouvra_test');

    await request(app).post('/api/auth/register')
        .send({ name: 'Test', email: 'agent2@test.tn', password: 'Password1', role: 'agent' });
    const res = await request(app).post('/api/auth/login')
        .send({ email: 'agent2@test.tn', password: 'Password1' });
    cookie = res.headers['set-cookie'];

    // Créer un client pour les tests
    const clientRes = await request(app)
        .post('/api/clients')
        .set('Cookie', cookie)
        .send({ name: 'Client Facture', email: 'facture@test.tn' });
    clientId = clientRes.body.client._id;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/invoices', () => {
    it('doit créer une facture', async () => {
        const res = await request(app)
            .post('/api/invoices')
            .set('Cookie', cookie)
            .send({
                client: clientId,
                amount: 1000,
                dueDate: '2026-12-31'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.invoice).toHaveProperty('amount', 1000);
    });

    it('doit refuser un montant négatif', async () => {
        const res = await request(app)
            .post('/api/invoices')
            .set('Cookie', cookie)
            .send({
                client: clientId,
                amount: -100,
                dueDate: '2026-12-31'
            });
        expect(res.statusCode).toBe(400);
    });

    it('doit refuser sans client', async () => {
        const res = await request(app)
            .post('/api/invoices')
            .set('Cookie', cookie)
            .send({
                amount: 1000,
                dueDate: '2026-12-31'
            });
        expect(res.statusCode).toBe(400);
    });
});

describe('GET /api/invoices', () => {
    it('doit retourner la liste des factures', async () => {
        const res = await request(app)
            .get('/api/invoices')
            .set('Cookie', cookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.invoices).toBeInstanceOf(Array);
    });
});