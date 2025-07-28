import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();

export const createMentor = async (userData) => {
  const params = {
    TableName: "Mentors",
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
    console.error("Error creating student:", err);
    return { success: false, error: err.message };
  }
};
//get username
export const getMentorByUsername = async (username) => {
  const params = {
    TableName: "Mentors",
    IndexName: "username-index", // You'll need to create this GSI
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": username,
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

export const getMentorByEmail = async (email) => {
  const params = {
    TableName: "Mentors",
    IndexName: "email-index", // You'll need to create this GSI
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
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
export const getMentorById = async (id) => {
  const params = {
    TableName: "Mentors",
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
