import express from "express";
import {
  login,
  register,
  resetPassword,
} from "../controller/student_authentication.js";
import jwtAuth from "../middleware/auth.js";
const authRouter = express.Router();
//auth routes
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.put("/resetpassword", jwtAuth, resetPassword);

export default authRouter;
