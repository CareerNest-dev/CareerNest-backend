import dotenv from "dotenv";
import { applyByStudent, createJob, getJobsByProviderId } from "../db/job.js";

dotenv.config();

//crate new job post by  provider
export const createJobByProvider = async (req, res) => {
  const {
    job_title,
    experience_level,
    location,
    company,
    location_type,
    skills,
    description,
  } = req.body;
  const { id, role } = req.user;

  // if (role !== "mentor") {
  //     return res.status(401).json({ error: "Unauthorized" });
  // }

  if (
    !job_title ||
    !experience_level ||
    !location ||
    !company ||
    !location_type ||
    !skills ||
    !description
  ) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }

  const result = await createJob({
    job_title,
    experience_level,
    location,
    company,
    location_type,
    skills,
    description,
    provider_id: id,
  });
  if (result.success) {
    return res
      .status(200)
      .json({ message: "job created successfully.pending for approvel" });
  } else {
    return res.status(400).json({ error: result.error });
  }
};
//get all jobs releted to provider
export const fetchJobs = async (req, res) => {
  const { id, role } = req.user;
  // if (role !== "student") {
  //     return res.status(401).json({ error: "Unauthorized" });
  // }
  try {
    const result = await getJobsByProviderId(id);
    if (result.success) {
      return res.status(200).json({ success: true, jobs: result.jobs });
    } else {
      return res.status(400).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ error: "Internal server error" });
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
    return res.status(200).json({ message: "apply the job successfully" });
  } else {
    return res.status(400).json({ error: result.error });
  }
};
