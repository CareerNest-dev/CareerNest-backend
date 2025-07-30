import express from "express";
import { createTimeSlot,fetchTimeSlotsByMentor } from "../controller/mentor_controller.js";
//import { login, register } from "../controller/student_authentication.js";

const mentorRouter = express.Router();

mentorRouter.post("/time-slots/create", createTimeSlot);
mentorRouter.get("/time-slots/fetch", fetchTimeSlotsByMentor);


export default mentorRouter;
