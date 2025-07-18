import dynamodb from "../config/aws/aws_config.js";

export const toggleAccountStatus = async (id, role, isActive) => {
  // Validate role
  if (!["student", "provider", "mentor"].includes(role)) {
    return { success: false, error: "Invalid role" };
  }

  // Determine table based on role
  const tableName =
    role === "student"
      ? "Students"
      : role === "provider"
      ? "Providers"
      : "Mentors";

  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: "SET isActive = :isActive, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":isActive": isActive,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamodb.update(params).promise();
    return { success: true, updatedAttributes: result.Attributes };
  } catch (error) {
    console.error(
      `Error toggling ${role} account status:`,
      JSON.stringify(error, null, 2)
    );
    return {
      success: false,
      error: error.message || "Failed to update account status",
    };
  }
};
