import express from "express";
import {
  applyJobByStudent,
  createJobByProvider,
  fetchJobs,
} from "../controller/job_controller.js";
//import { login, register } from "../controller/student_authentication.js";
import jwtAuth from "../middleware/auth.js";
const jobRouter = express.Router();

jobRouter.post("/createJobs", jwtAuth, createJobByProvider); //checked
jobRouter.get("/fetchJobs", jwtAuth, fetchJobs); //checked
jobRouter.post("/applyJobs", jwtAuth, applyJobByStudent); //checked

export default jobRouter;
