// server/src/services/recurrenceService.js
import { addDays, addWeeks, addMonths } from "date-fns";

/**
 * Expands a recurring event into all its occurrences within a given date range.
 * @param {Object} event - The event object (must have start_time, recurrence_type, etc.)
 * @param {Date} rangeStart - Start of the calendar range
 * @param {Date} rangeEnd - End of the calendar range
 * @returns {Array} Array of event objects, one for each occurrence
 */
export function expandRecurringEvent(event, rangeStart, rangeEnd) {
  const occurrences = [];
  let occurrenceStart = new Date(event.start_time); // Start from the event's initial start_time
  // Use recurrence_until if set, otherwise use the requested rangeEnd
  const end = event.recurrence_until
    ? new Date(event.recurrence_until)
    : rangeEnd;
  const eventEndTime = event.end_time ? new Date(event.end_time) : null;
  while (occurrenceStart <= end && occurrenceStart <= rangeEnd) {
    // Only include occurrences within the requested range
    if (occurrenceStart >= rangeStart) {
      // Clone the event and set the occurrence's start/end time
      const occurrence = { ...event };
      occurrence.start_time = occurrenceStart.toISOString();
      if (eventEndTime) {
        // Maintain the original event's duration
        const duration = eventEndTime - new Date(event.start_time);
        occurrence.end_time = new Date(
          occurrenceStart.getTime() + duration
        ).toISOString();
      }
      occurrences.push(occurrence);
    }
    // Advance to the next occurrence based on recurrence_type
    if (event.recurrence_type === "daily") {
      occurrenceStart = addDays(occurrenceStart, 1);
    } else if (event.recurrence_type === "weekly") {
      occurrenceStart = addWeeks(occurrenceStart, 1);
    } else if (event.recurrence_type === "monthly") {
      occurrenceStart = addMonths(occurrenceStart, 1);
    } else {
      // Handle unknown or unsupported recurrence type: throw error
      const errMsg = `Unknown or unsupported recurrence type: ${event.recurrence_type}`;
      throw new Error(errMsg);
    }
  }
  return occurrences;
}
