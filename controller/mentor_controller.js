import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { create,getMentoringTimeSlotsByMentor } from "../db/mentoring_time_slot.js";

dotenv.config();

//register user
export const createTimeSlot = async (req, res) => {
    const { day, start, end } = req.body;
    const { id, role } = req.user;


    // if (role !== "mentor") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    if (!day || !start || !end) {
        return res.status(400).json({ succss: false, massage: "missing details" });
    }

    const result = await create({ day, start, end, mentor_id: id });
    if (result.success) {
        return res.status(200).json({ message: "Time slot created successfully" });
    } else {
        return res.status(400).json({ error: result.error });
    }

};



export const fetchTimeSlotsByMentor = async (req, res) => {
    const { id, role } = req.user;
    // if (role !== "student") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }
    const result = await getMentoringTimeSlots(id);
    if (result.success) {
        return res.status(200).json({ timeSlots: result.timeSlots });
    } else {
        return res.status(400).json({ error: result.error });
    }
};


