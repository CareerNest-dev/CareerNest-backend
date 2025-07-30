import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { create, getJobs, applyByStudent } from "../db/job.js";

dotenv.config();

//register user
export const createJob = async (req, res) => {
    const { job_title, experience_level, location, company, location_type, skills, description } = req.body;
    const { id, role } = req.user;


    // if (role !== "mentor") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    if (!job_title || !experience_level || !location || !company || !location_type || !skills || !description) {
        return res.status(400).json({ succss: false, massage: "missing details" });
    }

    const result = await create({ job_title, experience_level, location, location_type, skills, description, provider_id: id });
    if (result.success) {
        return res.status(200).json({ message: "Time slot created successfully" });
    } else {
        return res.status(400).json({ error: result.error });
    }

};



export const fetchJobs = async (req, res) => {
    const { id, role } = req.user;
    // if (role !== "student") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }
    const result = await getJobs(id);
    if (result.success) {
        return res.status(200).json({ timeSlots: result.timeSlots });
    } else {
        return res.status(400).json({ error: result.error });
    }
};


export const applyJobByStudent = async (req, res) => {
    const { job_id } = req.body;
    const { id, role } = req.user;


    // if (role !== "mentor") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    if (!job_id) {
        return res.status(400).json({ succss: false, massage: "missing details" });
    }

    const result = await applyByStudent({ job_id, student_id: id });
    if (result.success) {
        return res.status(200).json({ message: "Time slot created successfully" });
    } else {
        return res.status(400).json({ error: result.error });
    }

};

