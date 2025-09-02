import dynamodb from "../../config/aws/dynamo_db_config.js";
import {
  calculateGrowth,
  getTableCount,
  groupBy,
  scanFullTable,
  searchInTable,
} from "../../helper/admin_helper/getuser_data.js";
// Table names
const TABLES = {
  STUDENTS: "Students",
  MENTORS: "Mentors",
  RECRUITERS: "Providers",
  JOBS: "Jobs",
};
//Get user type from table name
function getTypeFromTable(tableName) {
  switch (tableName) {
    case TABLES.STUDENTS:
      return "student";
    case TABLES.MENTORS:
      return "mentor";
    case TABLES.RECRUITERS:
      return "recruiter";
    default:
      return "unknown";
  }
}
//get user count
export const getUserCounts = async (req, res) => {
  try {
    // Fetch counts for each user type in parallel
    const [studentsCount, mentorsCount, recruitersCount] = await Promise.all([
      getTableCount(TABLES.STUDENTS),
      getTableCount(TABLES.MENTORS),
      getTableCount(TABLES.RECRUITERS),
    ]);
    const summary = {
      totalUsers: studentsCount + mentorsCount + recruitersCount,
      usersByCategory: {
        students: studentsCount,
        mentors: mentorsCount,
        recruiters: recruitersCount,
      },
      lastUpdated: new Date().toISOString(),
    };
    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (err) {
    console.error("Error fetching dashboard summary:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
    });
  }
};
/**
 * Get all students with details
 * Supports pagination
 */
export const getStudents = async (req, res) => {
  try {
    const { limit = 20, lastEvaluatedKey } = req.query;
    const params = {
      TableName: TABLES.STUDENTS,
      Limit: parseInt(limit),
      AttributesToGet: [
        "id",
        "username",
        "email",
        "address",
        "mobileNumber",
        "skills",
        "description",
        "updatedAt",
        "university",
        "linkedin",
        "company",
        "profileImageUrl",
        "isValidate",
        "isActive",
      ],
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = JSON.parse(
        decodeURIComponent(lastEvaluatedKey)
      );
    }
    const result = await dynamodb.scan(params).promise();

    // Process profile pictures if they exist
    // const studentsWithSignedUrls = await processProfilePictures(result.Items);

    return res.status(200).json({
      success: true,
      data: {
        students: result.Items,
        count: result.Count,
        scannedCount: result.ScannedCount,
        lastEvaluatedKey: result.LastEvaluatedKey
          ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
          : null,
      },
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

/**
 * Get all mentors with details
 * Supports pagination
 */
export const getMentors = async (req, res) => {
  try {
    const { limit = 20, lastEvaluatedKey } = req.query;

    const params = {
      TableName: TABLES.MENTORS,
      Limit: parseInt(limit),
      AttributesToGet: [
        "id",
        "username",
        "email",
        "address",
        "mobileNumber",
        "skills",
        "description",
        "updatedAt",
        "university",
        "linkedin",
        "company",
        "profileImageUrl",
        "isValidate",
        "isActive",
      ],
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = JSON.parse(
        decodeURIComponent(lastEvaluatedKey)
      );
    }

    const result = await dynamodb.scan(params).promise();

    // Process profile pictures if they exist
    // const mentorsWithSignedUrls = await processProfilePictures(result.Items);

    return res.status(200).json({
      success: true,
      data: {
        mentors: result.Items,
        count: result.Count,
        scannedCount: result.ScannedCount,
        lastEvaluatedKey: result.LastEvaluatedKey
          ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
          : null,
      },
    });
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

/**
 * Get all recruiters/providers with details
 * Supports pagination
 */
export const getRecruiters = async (req, res) => {
  try {
    const { limit = 20, lastEvaluatedKey } = req.query;

    const params = {
      TableName: TABLES.RECRUITERS,
      Limit: parseInt(limit),
      AttributesToGet: [
        "id",
        "username",
        "email",
        "address",
        "mobileNumber",
        "skills",
        "description",
        "updatedAt",
        "university",
        "linkedin",
        "company",
        "profileImageUrl",
        "isValidate",
        "isActive",
      ],
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = JSON.parse(
        decodeURIComponent(lastEvaluatedKey)
      );
    }

    const result = await dynamodb.scan(params).promise();

    // Process profile pictures if they exist
    // const recruitersWithSignedUrls = await processProfilePictures(result.Items);

    return res.status(200).json({
      success: true,
      data: {
        recruiters: result.Items,
        count: result.Count,
        scannedCount: result.ScannedCount,
        lastEvaluatedKey: result.LastEvaluatedKey
          ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
          : null,
      },
    });
  } catch (err) {
    console.error("Error fetching recruiters:", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

/**
 * Get detailed user statistics
 * Returns more comprehensive analytics
 */
export const getUserStatistics = async (req, res) => {
  try {
    const [students, mentors, recruiters] = await Promise.all([
      scanFullTable(TABLES.STUDENTS),
      scanFullTable(TABLES.MENTORS),
      scanFullTable(TABLES.RECRUITERS),
    ]);

    // Calculate statistics
    const statistics = {
      students: {
        total: students.length,
        active: students.filter((s) => s.isActive === true).length,

        byUniversity: groupBy(students, "university"),
        byAddress: groupBy(students, "address"),
      },
      mentors: {
        total: mentors.length,
        active: mentors.filter((m) => m.isActive === true).length,
        inactive: mentors.filter((m) => m.isValidate === false).length,
        byCompany: groupBy(mentors, "company"),
        // byExpertise: groupByArray(mentors, "expertise"),
        //byExperience: categorizeByExperience(mentors),
      },
      recruiters: {
        total: recruiters.length,
        active: recruiters.filter((r) => r.status === true).length,
        inactive: recruiters.filter((r) => r.isValidate === false).length,
        byCompany: groupBy(recruiters, "company"),
        //byIndustry: groupBy(recruiters, "industry"),
      },
      growth: {
        lastWeek: calculateGrowth(students, mentors, recruiters, 7),
        lastMonth: calculateGrowth(students, mentors, recruiters, 30),
        lastQuarter: calculateGrowth(students, mentors, recruiters, 90),
      },
    };

    return res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (err) {
    console.error("Error fetching user statistics:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Search users across all categories

export const searchUsers = async (req, res) => {
  try {
    const { query, category, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    let results = [];

    // Search in specified category or all categories
    const tablesToSearch = category
      ? [TABLES[category.toUpperCase()]]
      : Object.values(TABLES);

    for (const table of tablesToSearch) {
      const searchResults = await searchInTable(table, query, limit);
      results = results.concat(
        searchResults.map((item) => ({
          ...item,
          userType: getTypeFromTable(table),
        }))
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        results,
        count: results.length,
      },
    });
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({
      success: false,
      message: "Failed to search users",
    });
  }
};
//get all jobs for admin
export const getAllJObData = async (req, res) => {
  try {
    const { limit = 20, lastEvaluatedKey } = req.query;
    const params = {
      TableName: TABLES.JOBS,
      Limit: parseInt(limit),
      AttributesToGet: [
        "id",
        "provider_id",
        "job_title",
        "experience_level",
        "location",
        "company",
        "location_type",
        "skills",
        "description",
        "updatedAt",
        "isValidate",
        "isActive",
      ],
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = JSON.parse(
        decodeURIComponent(lastEvaluatedKey)
      );
    }
    const result = await dynamodb.scan(params).promise();

    // Process profile pictures if they exist
    //  const studentsWithSignedUrls = await processProfilePictures(result.Items);

    return res.status(200).json({
      success: true,
      data: {
        students: result.Items,
        count: result.Count,
        scannedCount: result.ScannedCount,
        lastEvaluatedKey: result.LastEvaluatedKey
          ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
          : null,
      },
    });
  } catch (err) {
    console.error("Error getting jobs", err);
    res.status(500).json({
      success: false,
      message: "Failed to get jobs",
    });
  }
};
