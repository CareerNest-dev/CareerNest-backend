import express from "express";
import { update } from "../controller/update_userdata.js";

const updateRouter = express.Router();
//auth routes
updateRouter.post("/update", update);


export default updateRouter;