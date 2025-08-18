// server/src/services/eventService.js
import * as eventRepositoryModule from "./eventRepository.js";
import { expandRecurringEvent as defaultExpandRecurringEvent } from "./recurrenceService.js";

// Allow dependency injection for repository and recurrence fn to improve testability/DIP
let repository = eventRepositoryModule;
let expandRecurring = defaultExpandRecurringEvent;

export function setRepository(repo) {
  repository = repo;
}

export function setExpandRecurring(fn) {
  expandRecurring = fn;
}

/**
 * Create a new event record
 */
export async function createEvent(user_id, data) {
  return repository.create({ user_id, ...data });
}

/**
 * Get events for a user (or all), optionally expanding recurring events within a range
 * options: { user_id, rangeStart: Date|null, rangeEnd: Date|null }
 */
export async function getEvents(options = {}) {
  const { user_id, rangeStart = null, rangeEnd = null } = options;
  const where = user_id ? { user_id } : {};
  const events = await repository.findAll(where);
  const allEvents = [];
  for (const ev of events) {
    const e = ev.toJSON();
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

export async function getEventById(id) {
  const evt = await repository.findById(id);
  console.log("[DEBUG] eventService.getEventById", id, evt ? "FOUND" : "NULL");
  return evt;
}

export async function updateEvent(id, data) {
  return repository.update(id, data);
}

export async function deleteEvent(id) {
  return repository.deleteById(id);
}
