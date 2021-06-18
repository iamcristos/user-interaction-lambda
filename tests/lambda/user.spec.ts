import APIGatewayRequest from '../testUtils';
import {signupMain, loginMain } from '../../src/functions/user/handler';
import  userDb from '../../src/dynamo/user';

describe('USER Signup Lambda Function', () => {
    test('should create a user 200', async () => {
        const body = {password: 'password', email: 'test@gmail.com'};
        const payload = { body }
        const event = APIGatewayRequest(payload)
        const response = await signupMain(event);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
    })
})

describe('USER Login Lambda Function', () => {
    const payload = {password: 'password', email: 'test@gmail.com'};
    beforeEach(() => {
        return userDb.save(payload);
    })

    test('should login a user 200', async () => {
        const body = {password: 'password', email: 'test@gmail.com'};
        const payload = { body }
        const event = APIGatewayRequest(payload)
        const response = await loginMain(event);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
    });

    test('should return 401 if user Credential is not valid', async() => {
        const body = {password: 'passwords', email: 'test@gmail.com'};
        const payload = { body }
        const event = APIGatewayRequest(payload)
        const response = await loginMain(event);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(401);
        expect(typeof response.body).toBe('string');
    })
})