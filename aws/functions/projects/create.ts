import { ddbClient } from './ddbClient';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {

    if (!event.body) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    }
    try {
        const body = await createProject(event.body);
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

const createProject = async (body: string | null) => {
    try {
        const { name, description, status } = JSON.parse(body || '{}');
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall({
                id: uuidv4(),
                name: name,
                description: description,
                status: status,
            }),
        };

        const createResult = await ddbClient.send(new PutItemCommand(params));
        console.log(createResult);
        return createResult;

    } catch (e) {
        console.error(e);
        throw e;
    }
};
