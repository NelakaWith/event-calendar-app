// server/src/routes/eventRoutes.js
import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { validateToken } from "../middleware/jwt.middleware.js";

const router = express.Router();

// Protected CRUD routes for events
router.post("/", validateToken, createEvent);
router.get("/", validateToken, getEvents);
router.get("/:id", validateToken, getEventById);
router.put("/:id", validateToken, updateEvent);
router.delete("/:id", validateToken, deleteEvent);

export default router;
