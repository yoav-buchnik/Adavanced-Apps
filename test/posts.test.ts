import request from 'supertest';
import app from '../src/index';
import { connect, disconnect } from '../src/db';
import config from '../src/config/config';
import { Post } from '../src/models/post';
import { User } from '../src/models/user';

let accessToken: string;

beforeAll(async () => {
    await connect(config.mongoDB.uri);
    await Post.deleteMany({});
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

describe('Posts', () => {
    describe('POST /posts', () => {
        it('should create a new post', async () => {
            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    content: 'Test post',
                    sender: 'test@example.com'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('content', 'Test post');
        });
    });

    describe('GET /posts', () => {
        it('should get all posts', async () => {
            const response = await request(app)
                .get('/api/posts')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });
}); 