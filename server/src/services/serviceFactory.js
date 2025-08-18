// server/src/services/serviceFactory.js
import * as eventRepository from "./eventRepository.js";
import * as eventService from "./eventService.js";
import { expandRecurringEvent } from "./recurrenceService.js";

// Wire concrete implementations into the eventService module
eventService.setRepository(eventRepository);
eventService.setExpandRecurring(expandRecurringEvent);

export const EventService = eventService;

export default {
  EventService,
};
