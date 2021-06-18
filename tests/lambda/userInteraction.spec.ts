import APIGatewayRequest from '../testUtils';
import { main } from '../../src/functions/userInteraction/handler';
import  userDb from '../../src/dynamo/user';
import {generateCookie} from '../../src/libs/cookie';

describe('USERInteraction Lambda Function', () => {
    const payload = {password: 'password', email: 'test@gmail.com'};
    let user
    beforeEach(async() => {
        user = await userDb.save(payload);
    });

    test('should login a user 401', async () => {
        const body = {
            "eventType": "eventType",
            "eventSource": "eventSource",
            "userId": "034fb280-cf9a-11eb-be36-3b1f285acb75"
        }
        const payload = { body }
        const event = APIGatewayRequest(payload)
        const response = await main(event);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(401);
        expect(typeof response.body).toBe('string');
    });

    test('should return 200 ', async() => {
        const body = {password: 'passwords', email: 'test@gmail.com'};
        const cookie = await generateCookie(user.email, 1);
        const headers= {"Cookie": cookie}
        const payload = { body, headers }
        const event = APIGatewayRequest(payload)
        const response = await main(event);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
    })
})