import { hashPassword, matchPassword} from '../../src/libs/bcrypt';

describe('Bcrypt Hash', () => {

    let passwordHash;

    beforeEach(async() => {
        passwordHash = await hashPassword('password');
    });
    
    test('should hash password', async () => {
        const hash = await hashPassword('password');
        expect(hash).not.toBe('password');
    });

    test('should match password', async () => {
        const match = await matchPassword('password', passwordHash);
        expect(match).toBe(true);
    });
})
