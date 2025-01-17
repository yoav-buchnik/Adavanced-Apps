import request from 'supertest';
import app from '../src/index';
import { connect, disconnect } from '../src/db';
import config from '../src/config/config';
import { User } from '../src/models/user';

let accessToken: string;

beforeAll(async () => {
    await connect(config.mongoDB.uri);
    await User.deleteMany({});

    // Register and login to get access token
    await request(app)
        .post('/api/auth/register')
        .send({
            email: 'test@example.com',
            password: 'Password123!',
            username: 'testuser'
        });

    const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@example.com',
            password: 'Password123!'
        });

    accessToken = loginResponse.body.accessToken;
});

afterAll(async () => {
    await disconnect();
});

describe('Users', () => {
    describe('GET /users', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe('GET /users/:id', () => {
        it('should get user by id', async () => {
            const users = await User.find({});
            const userId = users[0]._id;

            const response = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('email', 'test@example.com');
        });
    });
}); 