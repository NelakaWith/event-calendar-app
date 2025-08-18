// server/src/controllers/eventController.js
import * as EventService from "../services/eventService.js";

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
  try {
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
    // Validate required fields
    if (!title || !start_time || !end_time) {
      return res
        .status(400)
        .json({ message: "Title, start_time, and end_time are required." });
    }
    // Only allow user_id from authenticated user
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Authentication required to create events." });
    }
    const user_id = req.user.id;
    // Defensive: ensure recurrence_type and recurrence_until are defined before use
    const recurrence_type_val =
      typeof req.body.recurrence_type !== "undefined"
        ? req.body.recurrence_type
        : null;
    const recurrence_until_val =
      typeof req.body.recurrence_until !== "undefined"
        ? req.body.recurrence_until
        : null;
    // Convert empty recurrence fields to null for non-recurring events
    const safeRecurrenceType =
      recurrence_type_val === "" ? null : recurrence_type_val;
    const safeRecurrenceUntil =
      recurrence_until_val === "" ? null : recurrence_until_val;
    // Create event in database via service
    const event = await EventService.createEvent(user_id, {
      title,
      description,
      start_time,
      end_time,
      location,
      timezone,
      is_recurring,
      recurrence_type: safeRecurrenceType,
      recurrence_until: safeRecurrenceUntil,
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event creation failed.", error: err.message });
  }
};

/**
 * Get all events for a user (or all events if no user_id specified).
 * If start and end query params are provided, recurring events are expanded into individual occurrences within that range.
 * Query params:
 *   - start: ISO string (inclusive start of calendar range)
 *   - end: ISO string (inclusive end of calendar range)
 */
export const getEvents = async (req, res) => {
  try {
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
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events.", error: err.message });
  }
};

// Get a single event by its ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventService.getEventById(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    res.json({ event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch event.", error: err.message });
  }
};

// Update an event by its ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventService.getEventById(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    // Convert empty recurrence fields to null for non-recurring events on update
    if (req.body) {
      if (req.body.recurrence_type === "") req.body.recurrence_type = null;
      if (req.body.recurrence_until === "") req.body.recurrence_until = null;
    }
    const updated = await EventService.updateEvent(id, req.body);
    res.json({ message: "Event updated successfully", event: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event update failed.", error: err.message });
  }
};

// Delete an event by its ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const ok = await EventService.deleteEvent(id);
    if (!ok) return res.status(404).json({ message: "Event not found." });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event deletion failed.", error: err.message });
  }
};
