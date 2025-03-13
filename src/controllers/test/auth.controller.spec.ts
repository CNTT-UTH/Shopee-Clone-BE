import request from 'supertest';
import app from '../../app';

describe('AuthController (e2e)', () => {
    it('should register a new user successfully', async () => {
        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'testpassword',
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should fail to register with existing username', async () => {
        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'testpassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username already exists');
    });
});
