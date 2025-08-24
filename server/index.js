// Entry point for the Express server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import rateLimit from "express-rate-limit";
import csrf from "csurf";

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

// Define rate limiting rules
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later.",
});
// Apply rate limiting to all routes
app.use(limiter);

// Conditionally apply CSRF middleware
if (process.env.NODE_ENV !== "test") {
  const csrfProtection = csrf({ cookie: true });
  app.use(csrfProtection);

  // Example: Send CSRF token to the client
  app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });
}

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

// Global error handler (should be last middleware)
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== "test") {
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
}
