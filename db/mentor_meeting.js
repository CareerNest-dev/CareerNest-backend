import dotenv from "dotenv";
import dynamodb from "../config/aws/aws_config.js";
dotenv.config();

export const create = async (data) => {
    const params = {
        TableName: "mentoring_meetings",
        Item: {
            id: `mt${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            mentor_id: data.mentor_id,
            time_slot_id: data.time_slot_id,
            date: data.date,
            student_id: data.student_id,
            status: "created",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },hh
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


export const getMeetingByStudent = async (student_id) => {
    const params = {
        TableName: "mentoring_meetings",
        IndexName: "id", // You'll need to create this GSI
        KeyConditionExpression: "student_id = :student_id",
        ExpressionAttributeValues: {
            ":student_id": student_id,
        },
    };
    try {
        const result = await dynamodb.query(params).promise();
        return result.Items.length > 0 ? result.Items[0] : null;
    } catch (err) {
        console.error("Error getting data by student_id:", error);
        return null;
    }
};


export const getMeetingByMentor = async (mentor_id) => {
    const params = {
        TableName: "mentoring_meetings",
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


