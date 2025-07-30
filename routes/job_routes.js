import express from "express";
import { createJob,fetchJobs } from "../controller/job_controller.js";
//import { login, register } from "../controller/student_authentication.js";

const jobRouter = express.Router();

jobRouter.post("/create", createJob);
jobRouter.get("/fetch", fetchJobs);


export default jobRouter;
