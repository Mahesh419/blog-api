import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      blogId: event.pathParameters.id,
    },
  };
  const results = await dynamoDb.get(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Item),
  };
};