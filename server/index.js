// Entry point for the Express server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Parse JSON bodies
app.use(express.json());
// Parse cookies
app.use(cookieParser());
// Log HTTP requests
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount auth routes
app.use("/api/auth", authRoutes);
// Mount event routes
app.use("/api/events", eventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`[HELLO!] Server running on http://${HOST}:${PORT}`);
});
