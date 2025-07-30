import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();

export const create = async (data) => {
  const params = {
    TableName: "jobs",
    Item: {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      provider_id_id: data.provider_id_id,
      job_title: data.job_title,
      experience_level: data.experience_level,
      location: data.location,
      location_type: data.location_type,
      skills: data.skills,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  try {
    console.log(params);
    await dynamodb.put(params).promise();
    return { success: true };
  } catch (err) {
    console.error("Error creating job:", err);
    return { success: false, error: err.message };
  }
};

export const getJobs = async (mentor_id) => {
  const params = {
    TableName: "jobs",
    IndexName: "id", // You'll need to create this GSI
  };
  try {
    const result = await dynamodb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  } catch (err) {
    console.error("Error getting data by mentor_id:", error);
    return null;
  }
};

export const applyByStudent = async (data) => {
  const params = {
    TableName: "student_jobs",
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
