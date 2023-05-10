import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./ddbClient.js";
import { v4 as uuidv4 } from "uuid";

exports.handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.pathParameters != null) {
          body = await getProject(event.pathParameters.id);
        } else {
          body = await getAllProjects();
        }
        break;
      case "POST":
        body = await createProject(event.body);
        break;
      case "DELETE":
        body = await deleteProject(event.pathParameters.id);
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
        error: e.message,
      }),
    };
  }
};

// GET project by id
const getProject = async (projectId) => {
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

// GET all projects
const getAllProjects = async () => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    const { Items } = await ddbClient.send(new ScanCommand(params));
    console.log(Items);

    return Items ? Items.map((item) => unmarshall(item)) : {};
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// POST project
const createProject = async (event) => {
  try {
    const { name, description, status } = JSON.parse(event.body);

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

// DELETE project by id
const deleteProject = async (projectId) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: projectId }),
    };

    await ddbClient.send(new DeleteItemCommand(params));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// PUT project by id
const updateProject = async (event) => {
  console.log(`updateProject function. event : "${event}"`);

  try {
    const requestBody = JSON.parse(event.body);
    const objKeys = Object.keys(requestBody);
    console.log(
      `updateProject function. requestBody : "${requestBody}", objKeys: "${objKeys}"`
    );

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
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Path: aws\functions\projects\index.js
