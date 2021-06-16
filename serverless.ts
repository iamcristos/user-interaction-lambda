import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'petsdeli',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    'serverless-iam-roles-per-function': {
      defaultInherit: true
    },
    prune: {
      automatic: true,
      number: 3
    }
  },
  plugins: ['serverless-webpack','serverless-offline', 'serverless-iam-roles-per-function', 'serverless-create-global-dynamodb-table', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
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
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
