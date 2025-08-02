//#region
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../config/mail/node_mailer.js";
import { createMentor, getMentorByEmail } from "../db/mentor.js";
import {
  createProvider,
  getProviderByEmail,
  getProviderByUsername,
} from "../db/provider.js";
import { createStudent, getStudentByEmail } from "../db/user.js";
import resetCurrentPassword from "../helper/reset_password.js";
import { toggleAccountStatus } from "../helper/toggle_status.js";
dotenv.config();
//#endregion

//register user
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }

  try {
    //check if username already exist for intern providers(organizatiion)
    if (role === "provider") {
      const existUser = await getProviderByUsername(username);
      if (existUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }
    let existingEmail;
    // Check if email already exists
    if (role === "student") {
      existingEmail = await getStudentByEmail(email);
    } else if (role === "provider") {
      existingEmail = await getProviderByEmail(email);
    } else {
      existingEmail = await getMentorByEmail(email);
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const codeExpireTime = Date.now() + 24 * 60 * 60 * 1000;
    // Generate unique ID
    const userId = `user_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // Create student record
    const userData = {
      userId,
      username,
      email,
      password: hasedPassword,
      role,
    };
    const isValidated = role === "student";
    let createResult;
    if (role === "student") {
      createResult = await createStudent(userData);
    } else if (role === "provider") {
      createResult = await createProvider(userData);
    } else {
      createResult = await createMentor(userData);
    }

    console.log(createResult);
    if (!createResult.succss) {
      console.log("Registration error");
      return res
        .status(500)
        .json({ error: "Failed to create student account" });
    }
    //is user initialy validate - students
    if (isValidated) {
      //send welcome massage
      // const mailReciver = {
      //   from: process.env.APP_EMAIL,
      //   to: userData.email,
      //   subject: "Welcome to CareerNest",
      //   html: WELCOME_EMAIL_TEMPLETE.replace("{{username}}", username),
      // };
      // //send email
      // await sendEmail.sendMail(mailReciver);
      await sendWelcomeEmail(email, username);
      const newToken = await jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET,
        {
          expiresIn: codeExpireTime,
        }
      );
      res.status(201).json({
        message: "user registered successfully",
        newToken,
        user: {
          userId,
          username,
          email,
          role,
          isValidated: true,
        },
      });
    } else {
      // const mailReciver = {
      //   from: process.env.APP_EMAIL,
      //   to: userData.email,
      //   subject: "Welcome to CareerNest",
      //   html: ACCOUNT_VERIFICATION_HTML_TEMPLETE.replace(
      //     "{{username}}",
      //     username
      //   ),
      // };
      // //send email
      // await sendEmail.sendMail(mailReciver);
      await sendVerificationEmail(email, username);
      res.status(200).json({
        message:
          "Registration submitted successfully. Your account is pending admin validation. You will receive an email once approved.",
        user: {
          userId,
          username,
          email,
          role,
          isValidated: false,
        },
      });
    }
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

//login user
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ succss: false, massage: "missing details" });
  }
  try {
    var user;
    if (role == "student") {
      user = await getStudentByEmail(email);
    } else if (role == "provider") {
      user = await getProviderByEmail(email);
    } else {
      user = await getMentorByEmail(email);
    }
    // Find student by username

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    console.log(user);
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const codeExpireTime = Date.now() + 24 * 60 * 60 * 1000;

    //jwt generate
    const newToken = await jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: codeExpireTime }
    );

    res.json({
      message: "Login successful",
      newToken,
      User: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isValidate: user.isValidate,
        isValidate: user.isActive,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};
//reset current password
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { id, role } = req.user;

  if (!password) {
    res.status(400).json({ err: "empty password" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const updateResult = await resetCurrentPassword(hasedPassword, role, id);
    if (!updateResult.success) {
      return res.status(500).json({ error: updateResult.error });
    }

    res.status(200).json({
      message: "password reset successfully",
    });
  } catch (err) {
    console.error("password reset error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};
//enable & disable user account
export const toggleStatus = async (req, res) => {
  const { isActive } = req.body;
  const { id, role } = req.user;

  // Validate input
  if (typeof isActive !== "boolean") {
    return res.status(400).json({ error: "isActive must be a boolean" });
  }

  try {
    const result = await toggleAccountStatus(id, role, isActive);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    res.status(200).json({
      message: `Account ${isActive ? "enabled" : "disabled"} successfully`,
      updatedAttributes: result.updatedAttributes,
    });
  } catch (err) {
    console.log("Error in account status endpoint:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};
//logout
export const logout = async (res, req) => {
  try {
    res.json({
      message: "Logout successful",
      success: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};
