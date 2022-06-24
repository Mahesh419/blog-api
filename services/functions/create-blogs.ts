import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const blogData = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      blogId: uuid.v4(),
      author: blogData.author,
      title: blogData.title,
      content: blogData.content,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};