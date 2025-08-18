// server/src/middleware/validation.middleware.js
import { ValidationError } from "../services/errors.js";

export function validateEventPayload(req, res, next) {
  const { title, start_time, end_time } = req.body || {};
  if (!title || !start_time || !end_time) {
    return next(
      new ValidationError("Title, start_time and end_time are required")
    );
  }
  // Normalize empty recurrence fields to null
  if (req.body.recurrence_type === "") req.body.recurrence_type = null;
  if (req.body.recurrence_until === "") req.body.recurrence_until = null;
  next();
}
