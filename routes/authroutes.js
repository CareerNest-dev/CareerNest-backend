import express from "express";
import {
  login,
  register,
  resetPassword,
  toggleStatus,
} from "../controller/user_authentication.js";
import jwtAuth from "../middleware/auth.js";
const authRouter = express.Router();
//auth routes
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.put("/resetpassword", jwtAuth, resetPassword);
authRouter.put("/account/status", jwtAuth, toggleStatus);

export default authRouter;
