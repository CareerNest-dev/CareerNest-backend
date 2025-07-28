import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();

const resetCurrentPassword = async (password, role, id) => {
  try {
    // Build dynamic update expression
    let updateExpression = "SET updatedAt = :updatedAt";
    const expressionAttributeValues = {
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames = {};

    // Add fields to update only if provided
    if (password) {
      updateExpression += ", #password = :password";
      expressionAttributeNames["#password"] = "password";
      expressionAttributeValues[":password"] = password;
    }
    let params;
    if (role === "student") {
      params = {
        TableName: "Students",
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      };
    } else if (role === "provider") {
      params = {
        TableName: "Providers",
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      };
    } else {
      params = {
        TableName: "Mentors",
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      };
    }

    const result = await dynamodb.update(params).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (err) {
    console.error("passwword update error in process:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export default resetCurrentPassword;
