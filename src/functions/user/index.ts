import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const signup = {
  handler: `${handlerPath(__dirname)}/handler.signupMain`,
  events: [
    {
      http: {
        method: 'post',
        path: 'signup',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}

export const login = {
  handler: `${handlerPath(__dirname)}/handler.loginMain`,
  events: [
    {
      http: {
        method: 'post',
        path: 'login',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
