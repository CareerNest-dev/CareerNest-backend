import dotenv from "dotenv";
import dynamodb from "../config/aws/dynamo_db_config.js";
dotenv.config();

export const create = async (data) => {
  const params = {
    TableName: "mentoring_time_slots",
    Item: {
      id: `mts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mentor_id: data.mentor_id,
      day: data.day,
      start: data.start,
      end: data.end,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  try {
    console.log(params);
    await dynamodb.put(params).promise();
    return { success: true };
  } catch (err) {
    console.error("Error creating time slot:", err);
    return { success: false, error: err.message };
  }
};

export const getMentoringTimeSlotsByMentor = async (mentor_id) => {
  const params = {
    TableName: "mentoring_time_slots",
    IndexName: "id", // You'll need to create this GSI
    KeyConditionExpression: "mentor_id = :mentor_id",
    ExpressionAttributeValues: {
      ":mentor_id": mentor_id,
    },
  };
  try {
    const result = await dynamodb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  } catch (err) {
    console.error("Error getting data by mentor_id:", error);
    return null;
  }
};
