// Entry point for the Express server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
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

// Start the server
app.listen(PORT, () => {
  console.log(`[HELLO!] Server running on http://localhost:${PORT}`);
});
