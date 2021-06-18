import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse, authJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { verifyCookie } from "@libs/cookie";
import userInteractionDb from "@dynamoDb/userInteraction";


const userInteraction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const cookieHeader = event.headers.Cookie;
  const { body } = event;
  try {
    await verifyCookie(cookieHeader);
    await userInteractionDb.save(body);
    return formatJSONResponse({
      message: 'Customer interaction saved Successfully ',
      success: true
    });
  } catch (error) {
    return authJSONResponse({
      message: "Unauthorized",
      success: false,
    });
  }
};


export const main = middyfy(userInteraction);
