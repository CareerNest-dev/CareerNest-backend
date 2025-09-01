import express from "express";
import { adminLogin } from "../../controller/admin_controller/admin_auth.js";
import {
  getMentors,
  getRecruiters,
  getStudents,
  getUserCounts,
  getUserStatistics,
  searchUsers,
  fetchGeneralCountMetrics
} from "../../controller/admin_controller/admin_data.js";
const adminRoutes = express.Router();

adminRoutes.post("/defultlogin", adminLogin);
adminRoutes.get("/getUserCount", getUserCounts);
adminRoutes.get("/dashboard/count-metrics/general/fetch", fetchGeneralCountMetrics);
adminRoutes.get("/getStudentData", getStudents);
adminRoutes.get("/getRecruitersData", getRecruiters);
adminRoutes.get("/getMentorsData", getMentors);
adminRoutes.get("/getUserStatistics", getUserStatistics);
adminRoutes.get("/searchUsers", searchUsers);

export default adminRoutes;
