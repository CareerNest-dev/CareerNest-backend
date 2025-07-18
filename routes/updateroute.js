import express from "express";
import { update } from "../controller/update_userdata.js";
import jwtAuth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const updateRouter = express.Router();
//auth routes
updateRouter.put("/userupdate", jwtAuth, upload.single("profileurl"), update);

export default updateRouter;
