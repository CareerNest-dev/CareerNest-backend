import dotenv from "dotenv";
import dynamodb from "../config/aws/aws_config.js";
dotenv.config();

export const createStudent = async (studentData) => {
  const params = {
    TableName: "Students",
    Item: {
      id: studentData.id,
      username: studentData.username,
      email: studentData.email,
      password: studentData.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  try {
    await dynamodb.put(params).promise();
    return { succss: true };
  } catch (err) {
    console.error("Error creating student:", error);
    return { success: false, error: error.message };
  }
};
//get username
export const getStudentByUsername = async (username) => {
  const params = {
    TableName: "Students",
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

export const getStudentByEmail = async (email) => {
  const params = {
    TableName: "Students",
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
