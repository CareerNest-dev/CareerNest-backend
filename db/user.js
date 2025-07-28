import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();

export const createStudent = async (userData) => {
  const params = {
    TableName: "Students",
    Item: {
      id: userData.userId,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true, // Default to active
    },
  };
  try {
    await dynamodb.put(params).promise();
    return { succss: true };
  } catch (err) {
    console.log("Error creating student:", err);
    return { success: false, error: err.message };
  }
};
//get username
export const getStudentByUsername = async (username, requesterId = null) => {
  const params = {
    TableName: "Students",
    IndexName: "username-index", // You'll need to create this GSI
    KeyConditionExpression: "username = :username",
    FilterExpression: "isActive = :isActive OR id = :requesterId",
    ExpressionAttributeValues: {
      ":username": username,
      ":isActive": true,
      ":requesterId": requesterId || username, // Allow the user to see their own disabled account
    },
  };
  try {
    const result = await dynamodb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  } catch (err) {
    console.error("Error getting student by username:", error);
    return null;
  }
};
//get email

export const getStudentByEmail = async (email, requesterId = null) => {
  const params = {
    TableName: "Students",
    IndexName: "email-index", // You'll need to create this GSI
    KeyConditionExpression: "email = :email",
    FilterExpression: "isActive = :isActive OR id = :requesterId",
    ExpressionAttributeValues: {
      ":email": email,
      ":isActive": true,
      ":requesterId": requesterId || email, // Allow the user to see their own disabled account
    },
  };

  try {
    const result = await dynamodb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  } catch (error) {
    console.error("Error getting student by email:", error);
    return null;
  }
};
//get id
export const getStudentById = async (id) => {
  const params = {
    TableName: "Students",
    Key: { id },
  };

  try {
    const result = await dynamodb.get(params).promise();
    return result.Item || null;
  } catch (error) {
    console.error("Error getting student by ID:", error);
    return null;
  }
};
