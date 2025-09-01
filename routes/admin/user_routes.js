import express from "express";
import { metrics_fetch,fetch } from "../../controller/admin_controller/users/user_controller.js";

const adminUserRoutes = express.Router();


adminUserRoutes.get("/metrics/fetch", metrics_fetch);
adminUserRoutes.get("/fetch", fetch);


export default adminUserRoutes;
