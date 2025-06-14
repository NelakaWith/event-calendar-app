// server/src/controllers/eventController.js
import { Event } from "../models/event.js";

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
      recurrence_type,
      recurrence_until,
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event creation failed.", error: err.message });
  }
};

// Get all events for a user (or all events if no user_id specified)
export const getEvents = async (req, res) => {
  try {
    const user_id = req.user?.id || req.query.user_id;
    const where = user_id ? { user_id } : {};
    const events = await Event.findAll({ where });
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
