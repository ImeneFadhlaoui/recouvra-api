require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {
    it('doit créer un utilisateur', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test@test.tn', password: 'Password1', role: 'agent' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('user');
    });

    it('doit refuser un email déjà utilisé', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test2@test.tn', password: 'Password1', role: 'agent' });
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test2@test.tn', password: 'Password1', role: 'agent' });
        expect(res.statusCode).toBe(400);
    });
});

describe('POST /api/auth/login', () => {
    it('doit connecter un utilisateur', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'Login User', email: 'login@test.tn', password: 'Password1', role: 'agent' });
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'login@test.tn', password: 'Password1' });
        expect(res.statusCode).toBe(200);
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('doit refuser un mauvais mot de passe', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'login@test.tn', password: 'WrongPassword1' });
        expect(res.statusCode).toBe(401);
    });
});