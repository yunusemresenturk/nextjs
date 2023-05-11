import { APIGatewayProxyEvent } from 'aws-lambda';
import { ddbClient } from './ddbClient';
import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    let body;
    if (event.pathParameters && event.pathParameters.id) {
      body = await deleteProject(event.pathParameters.id);
    }
    console.log(body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully finished operation: "${event.httpMethod}"`,
        body: body,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to execute operation: "${event.httpMethod}"`,
        error: (e as Error).message,
      }),
    };
  }
};
/*  */

const deleteProject = async (projectId: string) => {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ id: projectId }),
        };
        const deleteResult = await ddbClient.send(new DeleteItemCommand(params));
        console.log(deleteResult);
        return deleteResult;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
