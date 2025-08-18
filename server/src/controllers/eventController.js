// server/src/controllers/eventController.js
import { EventService } from "../services/serviceFactory.js";
import { ValidationError, NotFoundError } from "../services/errors.js";

/**
 * Expands a recurring event into all its occurrences within a given date range.
 * @param {Object} event - The event object (must have start_time, recurrence_type, etc.)
 * @param {Date} rangeStart - Start of the calendar range
 * @param {Date} rangeEnd - End of the calendar range
 * @returns {Array} Array of event objects, one for each occurrence
 */
// recurrence expansion moved to `src/services/recurrenceService.js`

// Create a new event
export const createEvent = async (req, res) => {
  // Destructure event fields from request body
  const {
    title,
    description,
    start_time,
    end_time,
    location,
    timezone,
    is_recurring,
    recurrence_type,
    recurrence_until,
  } = req.body;
  // Validation moved to middleware; ensure authenticated user
  if (!req.user || !req.user.id) {
    throw new ValidationError("Authentication required to create events.");
  }
  const user_id = req.user.id;
  // Create event in database via service
  const event = await EventService.createEvent(user_id, {
    title,
    description,
    start_time,
    end_time,
    location,
    timezone,
    is_recurring,
    recurrence_type,
    recurrence_until,
  });
  res.status(201).json({ message: "Event created successfully", event });
};

/**
 * Get all events for a user (or all events if no user_id specified).
 * If start and end query params are provided, recurring events are expanded into individual occurrences within that range.
 * Query params:
 *   - start: ISO string (inclusive start of calendar range)
 *   - end: ISO string (inclusive end of calendar range)
 */
export const getEvents = async (req, res) => {
  const user_id = req.user?.id || req.query.user_id;
  const { start, end } = req.query;
  const rangeStart = start ? new Date(start) : null;
  const rangeEnd = end ? new Date(end) : null;
  const events = await EventService.getEvents({
    user_id,
    rangeStart,
    rangeEnd,
  });
  res.json({ events });
};

// Get a single event by its ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await EventService.getEventById(id);
  console.log("[DEBUG] controller.getEventById found=", !!event);
  if (!event) throw new NotFoundError("Event not found.");
  res.json({ event });
};

// Update an event by its ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = await EventService.getEventById(id);
  if (!event) throw new NotFoundError("Event not found.");
  const updated = await EventService.updateEvent(id, req.body);
  res.json({ message: "Event updated successfully", event: updated });
};

// Delete an event by its ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  console.log("[DEBUG] deleteEvent called id=", id);
  const ok = await EventService.deleteEvent(id);
  console.log("[DEBUG] deleteEvent result=", ok);
  if (!ok) throw new NotFoundError("Event not found.");
  res.json({ message: "Event deleted successfully" });
};
