// server/src/services/eventService.js
import { expandRecurringEvent as defaultExpandRecurringEvent } from "./recurrenceService.js";

/**
 * Factory that creates an event service instance with injected dependencies.
 * @param {Object} deps
 * @param {Object} deps.repository - repository implementing findAll/findById/create/update/deleteById
 * @param {Function} deps.expandRecurring - function(event, rangeStart, rangeEnd) => Array
 */
export function createEventService({
  repository,
  expandRecurring = defaultExpandRecurringEvent,
}) {
  if (!repository)
    throw new Error("repository is required to createEventService");

  async function createEvent(user_id, data) {
    return repository.create({ user_id, ...data });
  }

  async function getEvents(options = {}) {
    const { user_id, rangeStart = null, rangeEnd = null } = options;
    const where = user_id ? { user_id } : {};
    const events = await repository.findAll(where);
    const allEvents = [];
    for (const ev of events) {
      // ORM instances may have toJSON; normalize
      const e = typeof ev.toJSON === "function" ? ev.toJSON() : ev;
      if (
        Boolean(e.is_recurring) &&
        e.recurrence_type &&
        rangeStart &&
        rangeEnd
      ) {
        allEvents.push(...expandRecurring(e, rangeStart, rangeEnd));
      } else {
        allEvents.push(e);
      }
    }
    return allEvents;
  }

  async function getEventById(id) {
    return repository.findById(id);
  }

  async function updateEvent(id, data) {
    return repository.update(id, data);
  }

  async function deleteEvent(id) {
    return repository.deleteById(id);
  }

  return {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
  };
}
