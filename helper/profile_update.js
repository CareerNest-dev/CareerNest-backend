import dotenv from "dotenv";
import dynamodb from "../config/aws/aws_config.js";
dotenv.config();
// New function to update student profile
const updateStudentProfile = async (id, role, profileData, profileurl) => {
  const {
    address,
    mobileNumber,
    skills,
    description,
    university,
    linkedin,
    company,
  } = profileData;

  // Build dynamic update expression
  let updateExpression = "SET updatedAt = :updatedAt";
  const expressionAttributeValues = {
    ":updatedAt": new Date().toISOString(),
  };
  const expressionAttributeNames = {};

  // Add fields to update only if provided
  if (address) {
    updateExpression += ", #address = :address";
    expressionAttributeNames["#address"] = "address";
    expressionAttributeValues[":address"] = address;
  }
  if (mobileNumber) {
    updateExpression += ", #mobileNumber = :mobileNumber";
    expressionAttributeNames["#mobileNumber"] = "mobileNumber";
    expressionAttributeValues[":mobileNumber"] = mobileNumber;
  }
  if (skills) {
    updateExpression += ", #skills = :skills";
    expressionAttributeNames["#skills"] = "skills";
    expressionAttributeValues[":skills"] = skills;
  }
  if (description) {
    updateExpression += ", #description = :description";
    expressionAttributeNames["#description"] = "description";
    expressionAttributeValues[":description"] = description;
  }
  if (university) {
    updateExpression += ", #university = :university";
    expressionAttributeNames["#university"] = "university";
    expressionAttributeValues[":university"] = university;
  }
  if (linkedin) {
    updateExpression += ", #linkedin = :linkedin";
    expressionAttributeNames["#linkedin"] = "linkedin";
    expressionAttributeValues[":linkedin"] = linkedin;
  }
  if (company) {
    updateExpression += ", #company = :company";
    expressionAttributeNames["#company"] = "company";
    expressionAttributeValues[":company"] = company;
  }
  if (profileurl) {
    updateExpression += ", #profileImageUrl = :profileImageUrl";
    expressionAttributeNames["#profileImageUrl"] = "profileImageUrl";
    expressionAttributeValues[":profileImageUrl"] = profileurl;
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

  try {
    const result = await dynamodb.update(params).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (error) {
    console.log("Error updating student profile:", error);
    return { success: false, error: error.message };
  }
};
export default updateStudentProfile;
