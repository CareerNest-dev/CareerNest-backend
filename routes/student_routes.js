import express from "express";
import { applyJobByStudent } from "../controller/job_controller.js";
import {
  createMeetingByStudent,
  fetchMeetingsByStudent,
} from "../controller/mentor_meeting_controller.js";
import jwtAuth from "../middleware/auth.js";
const studentsRoute = express.Router();

studentsRoute.post("/applyJobs", jwtAuth, applyJobByStudent);
studentsRoute.post("/cratemeeting", jwtAuth, createMeetingByStudent); //checked
studentsRoute.get("/fetchmeetings", jwtAuth, fetchMeetingsByStudent); //checked

export default studentsRoute;
