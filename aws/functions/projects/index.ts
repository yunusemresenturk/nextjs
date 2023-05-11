/* const { getProject } = require('./get-one');
const { getAllProjects } = require('./get-all');
const { createProject } = require('./create');
const { deleteProject } = require('./delete-one');
const { updateProject } = require('./update-one');
import { APIGatewayProxyEvent } from 'aws-lambda';

exports.handler = async (event: APIGatewayProxyEvent) => {
  let body;
  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.pathParameters && event.pathParameters.id) {
          body = await getProject(event.pathParameters.id);
        } else {
          body = await getAllProjects();
        }
        break;
      case "POST":
        body = await createProject(event.body);
        break;
      case "DELETE":
        if (event.pathParameters && event.pathParameters.id) {
          body = await deleteProject(event.pathParameters.id);
        }
        break;
      case "PUT":
        body = await updateProject(event);
        break;
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);
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
        error: Error,
      }),
    };
  }
};
 */