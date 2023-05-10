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
  console.log("request:", JSON.stringify(event, undefined, 2)); // Burada event nesnesini yazdırıyoruz.

  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.pathParameters != null) {
          // Burada pathParameters nesnesinin null olup olmadığını kontrol ediyoruz.
          body = await getUser(event.pathParameters.id); // GET user/{id}
        } else {
          body = await getAllUsers(); // GET users
        }
        break;

      case "POST":
        body = await createUser(event.body); // POST user

        break;

      case "DELETE":
        body = await deleteUser(event.pathParameters.id); // DELETE user/{id}

        break;

      case "PUT":
        body = await updateUser(event); // PUT user/{id}

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
        message: "Failed to perform operation.",

        errorMsg: e.message,

        errorStack: e.stack,
      }),
    };
  }
};

const getUser = async (userId) => {
  // GET user/{id}

  console.log("getUser"); // Burada getUser fonksiyonunu yazdırıyoruz.

  try {
    // Burada try-catch bloğu kullanıyoruz.

    const params = {
      // Burada params nesnesini oluşturuyoruz.

      TableName: process.env.DYNAMODB_TABLE_NAME, // Burada DYNAMODB_TABLE_NAME ortam değişkenini kullanıyoruz.

      Key: marshall({ id: userId }), // Burada id alanını kullanıyoruz.
    };

    const { Item } = await ddbClient.send(new GetItemCommand(params)); // Burada ddbClient nesnesini kullanıyoruz.

    console.log(Item); // Burada Item nesnesini yazdırıyoruz.

    return Item ? unmarshall(Item) : {}; // Burada Item nesnesini döndürüyoruz.
  } catch (e) {
    // Burada catch bloğunu yazıyoruz.

    console.error(e); // Burada hata mesajını yazdırıyoruz.

    throw e; // Burada hata mesajını döndürüyoruz.
  }
};

const getAllUsers = async () => {
  // GET users

  console.log("getAllUsers"); // Burada getAllUsers fonksiyonunu yazdırıyoruz.

  try {
    // Burada try-catch bloğu kullanıyoruz.

    const params = {
      // Burada params nesnesini oluşturuyoruz.

      TableName: process.env.DYNAMODB_TABLE_NAME, // Burada DYNAMODB_TABLE_NAME ortam değişkenini kullanıyoruz.
    };

    const { Items } = await ddbClient.send(new ScanCommand(params)); // Burada ddbClient nesnesini kullanıyoruz.

    console.log(Items); // Burada Items nesnesini yazdırıyoruz.

    return Items ? Items.map((item) => unmarshall(item)) : {}; // Burada Items nesnesini döndürüyoruz.
  } catch (e) {
    // Burada catch bloğunu yazıyoruz.

    console.error(e); // Burada hata mesajını yazdırıyoruz.

    throw e; // Burada hata mesajını döndürüyoruz.
  }
};

const createUser = async (event) => {
  // POST user

  console.log(`createUser function. event : "${event}"`); // Burada createUser fonksiyonunu yazdırıyoruz.

  try {
    // Burada try-catch bloğu kullanıyoruz.

    const { name, surname, email, password } = JSON.parse(event.body); // Burada body nesnesini kullanıyoruz.

    const params = {
      // Burada params nesnesini oluşturuyoruz.

      TableName: process.env.DYNAMODB_TABLE_NAME, // Burada DYNAMODB_TABLE_NAME ortam değişkenini kullanıyoruz.

      Item: marshall({
        // Burada Item nesnesini oluşturuyoruz.

        id: uuidv4(), // Burada uuidv4() fonksiyonunu kullanıyoruz.

        name: name, // Burada name alanını kullanıyoruz.

        surname: surname, // Burada surname alanını kullanıyoruz.

        email: email, // Burada email alanını kullanıyoruz.

        password: password, // Burada password alanını kullanıyoruz.
      }),
    };

    const createResult = await ddbClient.send(new PutItemCommand(params)); // Burada ddbClient nesnesini kullanıyoruz.

    console.log(createResult); // Burada createResult nesnesini yazdırıyoruz.

    return createResult; // Burada createResult nesnesini döndürüyoruz.
  } catch (e) {
    // Burada catch bloğunu yazıyoruz.

    console.error(e); // Burada hata mesajını yazdırıyoruz.

    throw e; // Burada hata mesajını döndürüyoruz.
  }
};

const deleteUser = async (userId) => {
  // DELETE user/{id}

  console.log("deleteUser"); // Burada deleteUser fonksiyonunu yazdırıyoruz.

  try {
    // Burada try-catch bloğu kullanıyoruz.

    const params = {
      // Burada params nesnesini oluşturuyoruz.

      TableName: process.env.DYNAMODB_TABLE_NAME, // Burada DYNAMODB_TABLE_NAME ortam değişkenini kullanıyoruz.

      Key: marshall({ id: userId }), // Burada id alanını kullanıyoruz.
    };

    await ddbClient.send(new DeleteItemCommand(params)); // Burada ddbClient nesnesini kullanıyoruz.
  } catch (e) {
    // Burada catch bloğunu yazıyoruz.

    console.error(e); // Burada hata mesajını yazdırıyoruz.

    throw e; // Burada hata mesajını döndürüyoruz.
  }
};

const updateUser = async (event) => {
  console.log(`updateUser function. event : "${event}"`);

  try {
    const requestBody = JSON.parse(event.body);

    const objKeys = Object.keys(requestBody);

    console.log(
      `updateUser function. requestBody : "${requestBody}", objKeys: "${objKeys}"`
    );

    const userId = event.pathParameters.id;

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,

      Key: marshall({ id: userId }),

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
