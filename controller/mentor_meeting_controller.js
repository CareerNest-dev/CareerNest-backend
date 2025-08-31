import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { create, getMeetingByStudent ,getMeetingByMentor} from "../db/mentor_meeting.js";

dotenv.config();

//create meeting
export const createMeeting = async (req, res) => {
    const { time_slot_id, mentor_id ,date} = req.body;
    const { id, role } = req.user;


    // if (role !== "mentor") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    if (!time_slot_id || !mentor_id) {
        return res.status(400).json({ succss: false, massage: "missing details" });
    }

    const result = await create({ time_slot_id: time_slot_id, mentor_id: mentor_id, student_id: id ,date:date});
    if (result.success) {
        return res.status(200).json({ message: "Meeting created successfully" });
    } else {
        return res.status(400).json({ error: result.error });
    }

};



export const fetchMeetingsByStudent = async (req, res) => {
    const { id, role } = req.user;
    // if (role !== "student") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }
    const result = await getMeetingByStudent(id);
    if (result.success) {
        return res.status(200).json({ timeSlots: result.timeSlots });
    } else {
        return res.status(400).json({ error: result.error });
    }
};


export const fetchMeetingsByMentor = async (req, res) => {
    const { id, role } = req.user;
    // if (role !== "student") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }
    const result = await getMeetingByMentor(id);
    if (result.success) {
        return res.status(200).json({ timeSlots: result.timeSlots });
    } else {
        return res.status(400).json({ error: result.error });
    }
};


