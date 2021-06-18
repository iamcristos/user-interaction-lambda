import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import { userInteractionData, userInteraction } from "./interface";

export default class userInteractionDb {
  private static dynamoDb() {
    let options = {};
    // to enable sls offline database
    if (process.env.IS_OFFLINE) {
      options = {
        region: "localhost",
        endpoint: "http://localhost:8000",
      };
    }

    // to enable dynamo db for test
    if (process.env.JEST_WORKER_ID) {
      options = {
        endpoint: "http://localhost:8000",
        region: "local-env",
        sslEnabled: false,
      };
    }
    return new DynamoDB.DocumentClient(options);
  }

  static async save({ eventSource, eventType, userId }: userInteraction): Promise<userInteractionData> {
    const payloadInfo = {
      TableName: process.env.DYNAMO_TABLE || "petsdeli-lambda-test",
      Item: {
        id: uuid.v1(),
        eventType,
        userId,
        eventSource,
      },
    };
    await userInteractionDb.dynamoDb().put(payloadInfo).promise();
    return payloadInfo.Item;
  }
}
