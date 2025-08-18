// server/src/services/serviceFactory.js
import * as eventRepository from "./eventRepository.js";
import { createEventService } from "./eventService.js";
import { expandRecurringEvent } from "./recurrenceService.js";

// Instantiate the service with concrete implementations
export const EventService = createEventService({
  repository: eventRepository,
  expandRecurring: expandRecurringEvent,
});

export default {
  EventService,
};
