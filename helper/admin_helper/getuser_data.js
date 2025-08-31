import dynamodb from "../../config/aws/dynamo_db_config.js";
// Get count of items in a DynamoDB table

export const getTableCount = async (tableName) => {
  try {
    const params = {
      TableName: tableName,
      Select: "COUNT",
    };

    let count = 0;
    let lastEvaluatedKey = null;
    do {
      if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
      }

      const result = await dynamodb.scan(params).promise();
      count += result.Count;
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return count;
  } catch (err) {
    console.error(`Error counting items in ${tableName}:`, err);
    return 0;
  }
};

/**
 * Scan entire table (handles pagination internally)
 */
export const scanFullTable = async (tableName) => {
  const items = [];
  let lastEvaluatedKey = null;

  do {
    const params = {
      TableName: tableName,
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const result = await dynamodb.scan(params).promise();
    items.push(...result.Items);
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return items;
};

/**
 * Process profile pictures - generate signed URLs for S3 objects
 */

export const processProfilePictures = async (user) => {
  const processedUsers = await Promise.all(
    users.map(async (user) => {
      if (user.profilePicture && user.profilePicture.startsWith("s3://")) {
        try {
          const s3Key = user.profilePicture.replace("s3://", "");
          const bucketName = s3Key.split("/")[0];
          const objectKey = s3Key.substring(bucketName.length + 1);

          const signedUrl = await s3.getSignedUrlPromise("getObject", {
            Bucket: bucketName,
            Key: objectKey,
            Expires: 3600, // URL expires in 1 hour
          });

          return {
            ...user,
            profilePictureUrl: signedUrl,
          };
        } catch (error) {
          console.error("Error generating signed URL:", error);
          return user;
        }
      }
      return user;
    })
  );

  return processedUsers;
};

//Group array by property

export const groupBy = async (array, property) => {
  return array.reduce((acc, item) => {
    const key = item[property] || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

//Group by array property (for fields like expertise that might be arrays)

export const groupByArray = async (array, property) => {
  const result = {};
  array.forEach((item) => {
    const values = Array.isArray(item[property])
      ? item[property]
      : [item[property]];
    values.forEach((value) => {
      if (value) {
        result[value] = (result[value] || 0) + 1;
      }
    });
  });
  return result;
};

//Categorize mentors by years of experience

export const categorizeByExperience = async (mentors) => {
  return {
    "0-2 years": mentors.filter((m) => m.yearsOfExperience <= 2).length,
    "3-5 years": mentors.filter(
      (m) => m.yearsOfExperience > 2 && m.yearsOfExperience <= 5
    ).length,
    "6-10 years": mentors.filter(
      (m) => m.yearsOfExperience > 5 && m.yearsOfExperience <= 10
    ).length,
    "10+ years": mentors.filter((m) => m.yearsOfExperience > 10).length,
  };
};

/**
 * Calculate growth over specified days
 */
export const calculateGrowth = async (students, mentors, recruiters, days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const allUsers = [...students, ...mentors, ...recruiters];
  const newUsers = allUsers.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= cutoffDate;
  });

  return {
    newUsers: newUsers.length,
    students: students.filter((s) => new Date(s.createdAt) >= cutoffDate)
      .length,
    mentors: mentors.filter((m) => new Date(m.createdAt) >= cutoffDate).length,
    recruiters: recruiters.filter((r) => new Date(r.createdAt) >= cutoffDate)
      .length,
  };
};

/**
 * Search in a specific table
 */
export const searchInTable = async (tableName, query, limit) => {
  // Note: DynamoDB doesn't support LIKE queries efficiently
  // For production, consider using DynamoDB streams with ElasticSearch
  // This is a basic implementation using scan with filter

  const params = {
    TableName: tableName,
    FilterExpression:
      "contains(#email, :query) OR contains(#username, :query) OR contains(#address, :query) OR contains(#company, :query) OR contains(#university, :query)",
    ExpressionAttributeNames: {
      "#email": "email",
      "#username": "username",
      "#address": "address",
      "#company": "company",
      "#university": "university",
    },
    ExpressionAttributeValues: {
      ":query": query.toLowerCase(),
    },
    Limit: parseInt(limit),
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return result.Items;
  } catch (err) {
    console.error(`Error searching in ${tableName}:`, err);
    return [];
  }
};
