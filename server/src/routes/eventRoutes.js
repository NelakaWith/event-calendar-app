// server/src/routes/eventRoutes.js
import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { validateEventPayload } from "../middleware/validation.middleware.js";
import { asyncHandler } from "../middleware/async.middleware.js";
import { validateToken } from "../middleware/jwt.middleware.js";

const router = express.Router();

// Protected CRUD routes for events
router.post(
  "/",
  validateToken,
  validateEventPayload,
  asyncHandler(createEvent)
);
router.get("/", validateToken, asyncHandler(getEvents));
router.get("/:id", validateToken, asyncHandler(getEventById));
// Allow partial updates (PATCH-like behavior) — validation only for creation
router.put("/:id", validateToken, asyncHandler(updateEvent));
router.delete("/:id", validateToken, asyncHandler(deleteEvent));

export default router;
