import  userDb from '../../src/dynamo/user';

describe('User Database', () => {
    let userInfo
    beforeEach(async() => {
        const payload = { email: 'test+email@gmail.com', password: 'userInteraction click'}
        userInfo = await userDb.save(payload);
    })
    test('can save user Info', async() => {
        const payload = { email: 'email@gmail.com', password: 'userInteraction click'}
        const user =  await userDb.save(payload);
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.password).not.toEqual(payload.password)
    });
    

    test('can retrive user by email', async() => {
        const user = await userDb.loginUser({email: userInfo.email});
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe(userInfo.email);
    })
})
