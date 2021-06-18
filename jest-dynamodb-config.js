module.exports = {
    tables : [{
        TableName: 'petsdeli-lambda-test',
        AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"  
          }],
        KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
        }],
        BillingMode: 'PAY_PER_REQUEST',
    },
    {
        TableName: 'petsdeli-user-test',
        AttributeDefinitions: [{
            AttributeName: "email",
            AttributeType: "S"  
          }],
        KeySchema: [{
            AttributeName: "email",
            KeyType: "HASH"
        }],
        BillingMode: 'PAY_PER_REQUEST',
    }
    ]
}