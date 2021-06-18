import {formatJSONResponse, setCookieResponse, authJSONResponse} from '../../src/libs/apiGateway';

describe('GatewayResponse', () => {
    test('should return status 200', () => {
        const response = formatJSONResponse({message: 'testing success', success: true})
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string')
    });

    test('should set cookie header', () => {
        const response = setCookieResponse({message: 'testing success', success: true}, {cookie: true})
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
        expect(response.headers["Set-Cookie"]).toBeDefined();
    });

    test('should return 401', () => {
        const response = authJSONResponse({message: 'not authorized'});
        expect(response.statusCode).toBe(401);
        expect(typeof response.body).toBe('string');
    })
})