import express from "express";
import { fetch } from "../../controller/admin_controller/mentors/mentor_controller.js";

const adminMentorRoutes = express.Router();


adminMentorRoutes.get("/fetch", fetch);


export default adminMentorRoutes;
