import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { authJSONResponse, setCookieResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import UserDb from "@dynamoDb/user";
import { generateCookie } from "@libs/cookie";
import { matchPassword } from "@libs/bcrypt";

export const signup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { body } = event;
  const user = await UserDb.loginUser(body);
  if(!user) {
    await UserDb.save(body);
  }
  const cookie = generateCookie(body.email, 1);
  return setCookieResponse(
    {
      message: `Hello ${body.email}, welcome to Pets deli`,
      success: true,
      user
    },
    cookie
  );
};

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { body } = event;
  try {
      const user = await UserDb.loginUser(body);
      if (!user || !(await matchPassword(body.password, user.password))) {
        return authJSONResponse({
          message: 'Invalid Login details',
          success: false
        });
      }
      const cookie = generateCookie(body.email, 1);
      return setCookieResponse(
        {
          message: `Hello ${body.email}, welcome back to Pets deli`,
          success: true,
          user
        },
        cookie
      );
      
  } catch (error) {
      return authJSONResponse({
          message: 'Invalid Login details',
          success: false
        });
  }
};

export const signupMain = middyfy(signup);
export const loginMain = middyfy(login);
