import dotenv from "dotenv";
import {
  createTimeSlot,
  getMentoringTimeSlotsByMentor,
} from "../db/mentoring_time_slot.js";

dotenv.config();

//register user
export const createTimeSlotByMentor = async (req, res) => {
  const { day, start, end } = req.body;
  const { id, role } = req.user;

  // if (role !== "mentor") {
  //     return res.status(401).json({ error: "Unauthorized" });
  // }

  if (!day || !start || !end) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }

  const result = await createTimeSlot({ day, start, end, mentor_id: id });
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
  try {
    const result = await getMentoringTimeSlotsByMentor(id);
    if (result.success) {
      return res.status(200).json({ timeSlots: result.timeSlots });
    } else {
      console.error("Error getting time slots in table");
      return res.status(400).json({ error: result.error });
    }
  } catch (err) {
    console.error("Error getting time slots:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
