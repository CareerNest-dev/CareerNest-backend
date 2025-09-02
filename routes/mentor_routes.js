import express from "express";
import {
  createTimeSlotByMentor,
  fetchTimeSlotsByMentor,
} from "../controller/mentor_controller.js";
import { fetchMeetingsByMentor } from "../controller/mentor_meeting_controller.js";
//import { login, register } from "../controller/student_authentication.js";
import jwtAuth from "../middleware/auth.js";
const mentorRouter = express.Router();

mentorRouter.post("/time-slots/createtimeslot",jwtAuth, createTimeSlotByMentor);//checked
mentorRouter.get("/time-slots/fetchtimeslot",jwtAuth, fetchTimeSlotsByMentor);//checked
mentorRouter.get("/meeting/fetchtmeeting",jwtAuth, fetchMeetingsByMentor);// checked

export default mentorRouter;
