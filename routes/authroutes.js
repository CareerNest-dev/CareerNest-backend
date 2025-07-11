import express from "express";
import { login, register } from "../controller/student_authentication.js";

const authRouter = express.Router();
//auth routes
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
