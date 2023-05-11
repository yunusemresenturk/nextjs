import { ddbClient } from './ddbClient';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`updateProject function. event : "${event}"`);
  try {
    const requestBody = JSON.parse(event.body || "{}");
    const objKeys = Object.keys(requestBody);
    console.log(
      `updateProject function. requestBody : "${requestBody}", objKeys: "${objKeys}"`
    );
    if (event.pathParameters && event.pathParameters.id) {
      const projectId = event.pathParameters.id;
      const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: projectId }),
        UpdateExpression: `SET ${objKeys
          .map((_, index) => `#key${index} = :value${index}`)
          .join(", ")}`,
        ExpressionAttributeNames: objKeys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`#key${index}`]: key,
          }),
          {}
        ),
        ExpressionAttributeValues: marshall(
          objKeys.reduce(
            (acc, key, index) => ({
              ...acc,
              [`:value${index}`]: requestBody[key],
            }),
            {}
          )
        ),
      };
      await ddbClient.send(new UpdateItemCommand(params));
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
