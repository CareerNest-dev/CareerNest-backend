import express from "express";
import { approve, fetch, metrics_fetch, reject } from "../../controller/admin_controller/jobs/job_controller.js";

const adminJobRoutes = express.Router();

adminJobRoutes.post("/approve", approve);
adminJobRoutes.post("/reject", reject);
adminJobRoutes.get("/fetch", fetch);
adminJobRoutes.get("/metrics/fetch", metrics_fetch);


export default adminJobRoutes;
