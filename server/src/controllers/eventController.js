// server/src/controllers/eventController.js
import { Event } from "../models/event.js";

export const createEvent = async (req, res) => {
  try {
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
    if (!title || !start_time || !end_time) {
      return res
        .status(400)
        .json({ message: "Title, start_time, and end_time are required." });
    }
    // Optionally, get userId from req.user if using auth middleware
    const user_id = req.user?.id || req.body.user_id;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated." });
    }
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

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    // Optionally, check ownership: if (event.user_id !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await event.update(req.body);
    res.json({ message: "Event updated successfully", event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event update failed.", error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    // Optionally, check ownership: if (event.user_id !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event deletion failed.", error: err.message });
  }
};
