// server/src/controllers/eventController.js
import { Event } from "../models/event.js";
// Helper to expand recurring events into individual occurrences within a date range
// event: the event object (should have start_time, end_time, recurrence_type, recurrence_until)
// rangeStart, rangeEnd: JS Date objects defining the calendar range
import { addDays, addWeeks, addMonths } from "date-fns";

/**
 * Expands a recurring event into all its occurrences within a given date range.
 * @param {Object} event - The event object (must have start_time, recurrence_type, etc.)
 * @param {Date} rangeStart - Start of the calendar range
 * @param {Date} rangeEnd - End of the calendar range
 * @returns {Array} Array of event objects, one for each occurrence
 */
function expandRecurringEvent(event, rangeStart, rangeEnd) {
  const occurrences = [];
  let current = new Date(event.start_time); // Start from the event's initial start_time
  // Use recurrence_until if set, otherwise use the requested rangeEnd
  const end = event.recurrence_until
    ? new Date(event.recurrence_until)
    : rangeEnd;
  const eventEndTime = event.end_time ? new Date(event.end_time) : null;
  while (current <= end && current <= rangeEnd) {
    // Only include occurrences within the requested range
    if (current >= rangeStart) {
      // Clone the event and set the occurrence's start/end time
      const occurrence = { ...event };
      occurrence.start_time = current.toISOString();
      if (eventEndTime) {
        // Maintain the original event's duration
        const duration = eventEndTime - new Date(event.start_time);
        occurrence.end_time = new Date(
          current.getTime() + duration
        ).toISOString();
      }
      occurrences.push(occurrence);
    }
    // Advance to the next occurrence based on recurrence_type
    if (event.recurrence_type === "daily") {
      current = addDays(current, 1);
    } else if (event.recurrence_type === "weekly") {
      current = addWeeks(current, 1);
    } else if (event.recurrence_type === "monthly") {
      current = addMonths(current, 1);
    } else {
      // Handle unknown or unsupported recurrence type: throw error
      const errMsg = `Unknown or unsupported recurrence type: ${event.recurrence_type}`;
      throw new Error(errMsg);
    }
  }
  return occurrences;
}

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
    // Convert empty recurrence fields to null for non-recurring events
    const safeRecurrenceType = recurrence_type === "" ? null : recurrence_type;
    const safeRecurrenceUntil =
      recurrence_until === "" ? null : recurrence_until;
    // Create event in database
    const event = await Event.create({
      user_id,
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
    const where = user_id ? { user_id } : {};
    const events = await Event.findAll({ where });
    // Parse optional range query params
    const { start, end } = req.query;
    let rangeStart = start ? new Date(start) : null;
    let rangeEnd = end ? new Date(end) : null;
    let allEvents = [];
    for (const event of events) {
      // If event is recurring and a range is provided, expand it into occurrences
      if (
        event.is_recurring &&
        event.recurrence_type &&
        rangeStart &&
        rangeEnd
      ) {
        try {
          allEvents.push(
            ...expandRecurringEvent(event.toJSON(), rangeStart, rangeEnd)
          );
        } catch (expandErr) {
          return res.status(400).json({ message: expandErr.message });
        }
      } else {
        // Non-recurring events or no range: just include the event as-is
        allEvents.push(event.toJSON());
      }
    }
    res.json({ events: allEvents });
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
    const event = await Event.findByPk(id);
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
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    // Convert empty recurrence fields to null for non-recurring events on update
    if (req.body) {
      if (req.body.recurrence_type === "") req.body.recurrence_type = null;
      if (req.body.recurrence_until === "") req.body.recurrence_until = null;
    }
    await event.update(req.body);
    res.json({ message: "Event updated successfully", event });
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
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event deletion failed.", error: err.message });
  }
};
