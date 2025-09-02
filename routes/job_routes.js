import express from "express";
import {
  applyJobByStudent,
  createJobByProvider,
  fetchJobs,
} from "../controller/job_controller.js";
//import { login, register } from "../controller/student_authentication.js";

const jobRouter = express.Router();

jobRouter.post("/createJobs", createJobByProvider);
jobRouter.get("/fetchJobs", fetchJobs);
jobRouter.get("/applyJobs", applyJobByStudent);

export default jobRouter;
