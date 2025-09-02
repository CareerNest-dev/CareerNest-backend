import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();
//post new job by provider(initialy unverified)
export const createJob = async (data) => {
  const params = {
    TableName: "Jobs",
    Item: {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      provider_id: data.provider_id,
      job_title: data.job_title,
      experience_level: data.experience_level,
      location: data.location,
      company:data.company,
      location_type: data.location_type,
      skills: data.skills,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      Active: true,
      isValidate: false,
    },
  };
  try {
    //console.log(params);
    await dynamodb.put(params).promise();
    return { success: true };
  } catch (err) {
    console.error("Error creating job:", err);
    return { success: false, error: err.message };
  }
};
//for providers(fetch all jobs releted to specific provider)
export const getJobsByProviderId = async (provider_id) => {
  const params = {
    TableName: "Jobs",
    IndexName: "provider_id-index",
    KeyConditionExpression: "provider_id = :provider_id",
    FilterExpression: "isValidate = :isValidate OR id = :requesterId",
    ExpressionAttributeValues: {
      ":provider_id": provider_id,
      isValidate: true,
    },
  };
  try {
    const result = await dynamodb.query(params).promise();
    return result.Items.length > 0 ? result.Items : null;
  } catch (err) {
    console.error("Error getting data by mentor_id:", error);
    return null;
  }
};

export const applyByStudent = async (data) => {
  const params = {
    TableName: "studentJobs",
    Item: {
      id: `st_job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      job_id: data.job_id,
      student_id: data.student_id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  try {
    console.log(params);
    await dynamodb.put(params).promise();
    return { success: true };
  } catch (err) {
    console.error("Error applying job:", err);
    return { success: false, error: err.message };
  }
};
