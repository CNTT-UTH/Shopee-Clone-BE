import request from 'supertest';
import app from '../../app';
import AppDataSource from '~/dbs/db';

describe('AuthController (e2e)', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should fail to register with existing username', async () => {
        const response = await request(app).post('/api/v1/auth/register').send({
            email: 'linh@gmail.com',
            username: 'linh1234',
            password: 'Abc1234@',
            password_confirm: 'Abc1234@',
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', 'Validation failed');
    }, 20000);
});
