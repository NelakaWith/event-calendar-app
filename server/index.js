// Entry point for the Express server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

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

// Load external Swagger YAML file
const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  const blue = "\x1b[94m";
  const yellow = "\x1b[93m";
  const reset = "\x1b[0m";
  const bold = "\x1b[1m";
  const emoji = "🔥";
  console.log(
    `${blue}${bold}${emoji} [HELLO!]${reset}${yellow} Server running at: http://${HOST}:${PORT}${reset}`
  );
});
