import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authroutes.js";
import mentorRouter from "./routes/mentor_routes.js";
import jwtAuth from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use(jwtAuth);
app.use("/api/mentor", mentorRouter);
app.get("/", (req, res) => {
  res.send("server is ready to use");
});

//start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
