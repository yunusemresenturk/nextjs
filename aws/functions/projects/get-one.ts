import { ddbClient } from './ddbClient';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        let body;
        if (event.pathParameters && event.pathParameters.id) {
            body = await getProject(event.pathParameters.id);
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

const getProject = async (projectId: string) => {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ id: projectId }),
        };
        const { Item } = await ddbClient.send(new GetItemCommand(params));
        console.log(Item);
        return Item ? unmarshall(Item) : {};
    } catch (e) {
        console.error(e);
        throw e;
    }
};
