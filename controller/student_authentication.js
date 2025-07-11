import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  createStudent,
  getStudentByEmail,
  getStudentByUsername,
} from "../db/user.js";

dotenv.config();

//register user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }

  try {
    //check if username already exist
    const existUser = await getStudentByUsername(username);
    if (existUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await getStudentByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const codeExpireTime = Date.now() + 24 * 60 * 60 * 1000;
    // Generate unique ID
    const studentId = `student_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // Create student record
    const studentData = {
      id: studentId,
      username,
      email,
      password: hasedPassword,
    };

    const createResult = await createStudent(studentData);
    console.log(createResult);
    const newToken = await jwt.sign(
      { id: studentId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: codeExpireTime }
    );
    if (!createResult.success) {
      console.log("Registration error");
      return res
        .status(500)
        .json({ error: "Failed to create student account" });
    }
    res.status(201).json({
      message: "Student registered successfully",
      newToken,
      student: {
        id: studentId,
        username,
        email,
      },
    });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

//login user
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }
  try {
    // Find student by username
    const student = await getStudentByUsername(username);
    if (!student) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    console.log(student);
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const codeExpireTime = Date.now() + 24 * 60 * 60 * 1000;

    //jwt generate

    const newToken = await jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: codeExpireTime }
    );

    res.json({
      message: "Login successful",
      newToken,
      student: {
        id: student.id,
        username: student.username,
        email: student.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};
