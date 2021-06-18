# Serverless - AWS Node.js Typescript

## API Documentation

- https://documenter.getpostman.com/view/5376766/TzeXk7BV

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/webhook` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/webhook/schema.ts` JSON-Schema definition.

- requesting any other path than `/webhook` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/webhook` with a payload **not** will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/webhook` with a payload will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://9ftoeton1m.execute-api.us-east-1.amazonaws.com/dev/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "password"
}'

curl --location --request POST 'https://9ftoeton1m.execute-api.us-east-1.amazonaws.com/dev/userInteraction' \
--header 'Content-Type: application/json' \
--data-raw '{
    "eventType": "eventType",
    "eventSource": "eventSource",
    "userId": "tdehdfjjdjj"
}'

curl --location --request POST 'https://9ftoeton1m.execute-api.us-east-1.amazonaws.com/dev/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "password"
}'
```

### Test

Ensure you add Mailgun API Key in setEnvVars.js

process.env.API_KEY= 'MAIL GUN API KEY'

- run `npm test`

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `dynamo` - containing dynamo databse

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── userInteraction
│   │   │   ├── handler.ts      # `Webhook` lambda source code
│   │   │   ├── index.ts        # `Webhook` lambda Serverless configuration
│   │   │   ├── mock.json       # `Webhook lambda input parameter, if any, for local
        ├── user
│   │   │   ├── handler.ts      # `users` lambda source code
│   │   │   ├── index.ts        # `users` lambda Serverless configuration
│   │   │   ├── mock.json       # `user lambda input parameter, if any, for local
invocation
│   │   │   └── schema.ts       # `Webhook` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│   |   └── apiGateway.ts       # API Gateway specific helpers
│   |   └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│   |   └── lambda.ts           # Lambda middleware
│   |   └── cookie.ts           # cookie helper class
│   |   └── bcrypt.ts           # bcrypt helper class
|   |
|   └── dynamo                  # Shared Dynamo Database
|   |   └── user.ts             # User Database
    |   └── bu
|   |
|   └── notification            # Notification folder
|       └── index.ts            # Sns
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
