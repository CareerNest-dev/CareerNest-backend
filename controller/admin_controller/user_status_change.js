import {
  deleteUsers,
  verifidUserState,
} from "../../helper/admin_helper/chage_user_status.js";
//approved mentor/provider
export const approvedUsers = async (req, res) => {
  const { email, role, isValidate } = req.body;

  if (!email || !role || !isValidate) {
    return res.status(400).json({ error: "Incompleted data" });
  }
  try {
    const result = await verifidUserState(email, role, isValidate);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    await sendApprovedEmail(email, result.updatedAttributes.username);
    res.status(200).json({
      message: "Profile Approved successfully",
      updatedAttributes: result.updatedAttributes,
    });
  } catch (err) {
    console.error("Error in profile approved endpoint:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//reject/delete mentor/provider
export const rejectUsers = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: "Incompleted data" });
  }
  try {
    const result = await deleteUsers(email, role);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    await sendRejectEmail(email, result.updatedAttributes.username);
    res.status(200).json({
      message: "Profile Deleted successfully",
      updatedAttributes: result.updatedAttributes,
    });
  } catch (err) {
    console.error("Error in profile delete endpoint:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//approved job
export const approvedJob = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "Incompleted data" });
  }
  try {
    let updateExpression = "SET updatedAt = :updatedAt";
    const expressionAttributeValues = {
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames = {};
    updateExpression += ", #isValidate = :isValidate";
    expressionAttributeNames["#isValidate"] = "isValidate";
    expressionAttributeValues[":isValidate"] = true;
    // approve job by id
    const queryParams = {
      TableName: "Jobs",
      Key: { id: jobId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    };
    const result = await dynamodb.update(queryParams).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (err) {
    console.error("Error in profile delete endpoint:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//reject job
export const rejectJob = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "Incompleted data" });
  }
  try {
    //delete job by id
    const queryParams = {
      TableName: "Jobs",
      Key: { id: jobId },
      ReturnValues: "ALL_OLD",
    };
    const result = await dynamodb.delete(queryParams).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (err) {
    console.error("Error in profile delete endpoint:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
