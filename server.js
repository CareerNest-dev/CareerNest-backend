import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import adminRoutes from "./routes/admin/adminroutes.js";
import authRouter from "./routes/authroutes.js";
import mentorRouter from "./routes/mentor_routes.js";
import updateRouter from "./routes/updateroute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// CRITICAL: Health check endpoint for ALB
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    port: PORT,
    pid: process.pid,
  });
});

// Root endpoint for testing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "CarrerNest API is running",
    version: "1.0.0",
    health: "/health",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/update", updateRouter);
app.use("/api/mentor", mentorRouter);

//admin routes
app.use("/api/admin", adminRoutes);
//start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running on port ${PORT}`);
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

export default app;
