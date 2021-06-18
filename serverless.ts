import type { AWS } from '@serverless/typescript';

import userInteraction from '@functions/userInteraction';

import { login, signup } from '@functions/user';

const SERVICE_NAME = 'petsdeli-lambda'
const DYNAMO_TABLE = `${SERVICE_NAME}-dev`
const USER_TABLE = `${SERVICE_NAME}-user-dev`

const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: ['dev'],
      start: {port: 8000, inMemory: true, migrate: true},
      migration: {dir: 'offline/migrations'}
    },
    'serverless-iam-roles-per-function': {
      defaultInherit: true
    },
    prune: {
      automatic: true,
      number: 3
    }
  },
  plugins: [
  'serverless-webpack',
  'serverless-offline', 
  'serverless-iam-roles-per-function', 
  'serverless-create-global-dynamodb-table', 
  'serverless-prune-plugin',
  'serverless-dynamodb-local'
],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SERVICE_NAME,
      DYNAMO_TABLE,
      USER_TABLE, 
      JWT_SECRET: 'SECRET'
    },
    tracing: {
      lambda: true,
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [{
      Effect: 'Allow',
       Action: [
        'xray:PutTraceSegments',
        'xray:PutTelemetryRecords',
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'sns:*'
       ],
       Resource: '*'
    }]
  },
  resources: {
    Resources: {
      userInteractionDynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"  
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          TableName: DYNAMO_TABLE
        }
      },
      UserDynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          AttributeDefinitions: [{
            AttributeName: "email",
            AttributeType: "S"  
          }],
          KeySchema: [
          {
            AttributeName: "email",
            KeyType: "HASH"
          }
        ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          TableName: USER_TABLE
        }
      }
    }
  },
  // import the function via paths
  functions: { userInteraction, login, signup },
};

module.exports = serverlessConfiguration;
