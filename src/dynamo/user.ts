import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import { hashPassword } from '../libs/bcrypt';
import { userData } from "./interface";

export default class UserDb {
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

  static async save({ email, password }: {email: string, password: string }): Promise<userData> {
    password = await hashPassword(password);
    const payloadInfo = {
      TableName: process.env.USER_TABLE || 'petsdeli-user-test',
      Item: {
        id: uuid.v1(),
        email,
        password,
      },
    };
    await UserDb.dynamoDb().put(payloadInfo).promise();
    return payloadInfo.Item;
  }

  static async loginUser({ email }: {email: string}): Promise<userData | any> {
    const payloadInfo = {
      TableName: process.env.USER_TABLE || 'petsdeli-user-test',
      Key: {
        email
      },
    };
    const { Item } = await UserDb.dynamoDb().get(payloadInfo).promise();
    return Item;
  }
}