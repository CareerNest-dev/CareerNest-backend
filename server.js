import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import  authRouter  from "./routes/authroutes.js";
import  updateRouter  from "./routes/updateroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/update", updateRouter);
app.get("/", (req, res) => {
  res.send("server is ready to use");
});

//start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
