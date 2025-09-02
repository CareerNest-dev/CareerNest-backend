import express from "express";
import { adminLogin } from "../../controller/admin_controller/admin_auth.js";
import {
  getAllJObData,
  getMentors,
  getRecruiters,
  getStudents,
  getUserCounts,
  getUserStatistics,
  searchUsers,
} from "../../controller/admin_controller/admin_data.js";

import {
  approvedJob,
  approvedUsers,
  rejectJob,
  rejectUsers,
} from "../../controller/admin_controller/user_status_change.js";
const adminRoutes = express.Router();

adminRoutes.post("/defultlogin", adminLogin);
adminRoutes.get("/getUserCount", getUserCounts);
adminRoutes.get("/getStudentData", getStudents);
adminRoutes.get("/getRecruitersData", getRecruiters);
adminRoutes.get("/getMentorsData", getMentors);
adminRoutes.get("/getUserStatistics", getUserStatistics);
adminRoutes.get("/searchUsers", searchUsers);
adminRoutes.put("/approvedUser", approvedUsers);
adminRoutes.delete("/rejectUser", rejectUsers);
adminRoutes.put("/approvedJob", approvedJob);
adminRoutes.put("/rejectJob", rejectJob);
adminRoutes.get("/getAllJobs", getAllJObData);

export default adminRoutes;
