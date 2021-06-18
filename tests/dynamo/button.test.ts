import * as uuid from "uuid";
import  userInteractionDb from '../../src/dynamo/userInteraction';

test('userInteractionDb can save customer activity', async() => {
    const payload = { eventSource: '', eventType: 'userInteraction click', userId: uuid.v1() }
    const item =  await userInteractionDb.save(payload);
    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.userId).toBe(payload.userId)
})
