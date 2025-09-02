import dynamodb from "../../config/aws/dynamo_db_config.js";
//validate user
export const verifidUserState = async (email, role, isValidate) => {
  try {
    //select table
    const tableName = role === "provider" ? "Providers" : "Mentors";
    //find user by id
    const queryParams = {
      TableName: tableName,
      IndexName: "email-index", // Assumes a GSI named EmailIndex on the email attribute
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const queryResult = await dynamodb.query(queryParams).promise();
    const user = queryResult.Items[0];
    const userId = user.id; //get user id

    let updateExpression = "SET updatedAt = :updatedAt";
    const expressionAttributeValues = {
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames = {};

    if (isValidate !== undefined) {
      updateExpression += ", #isValidate = :isValidate";
      expressionAttributeNames["#isValidate"] = "isValidate";
      expressionAttributeValues[":isValidate"] = isValidate;
    }
    const updateParams = {
      TableName: tableName,
      Key: { id: userId }, // Use the id retrieved from the query
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    };
    const result = await dynamodb.update(updateParams).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (err) {
    console.log("Error updating student profile:", error);
    return { success: false, error: error.message };
  }
};
//delete user
export const deleteUsers = async (email, role) => {
  try {
    //select table
    const tableName = role === "provider" ? "Providers" : "Mentors";
    //find user by id
    const queryParams = {
      TableName: tableName,
      IndexName: "email-index", // Assumes a GSI named EmailIndex on the email attribute
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const queryResult = await dynamodb.query(queryParams).promise();
    const user = queryResult.Items[0];
    const userId = user.id; // get user id
    const deleteParams = {
      TableName: tableName,
      Key: { id: userId },
      ReturnValues: "ALL_OLD", // Returns the deleted item's attributes
    };
    const result = await dynamodb.delete(deleteParams).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (err) {
    console.log("Error deleting student profile:", error);
    return { success: false, error: error.message };
  }
};
