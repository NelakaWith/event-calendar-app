// server/src/services/eventRepository.js
import { Event } from "../models/event.js";

export async function findAll(where = {}) {
  return Event.findAll({ where });
}

export async function findById(id) {
  return Event.findByPk(id);
}

export async function create(data) {
  return Event.create(data);
}

export async function update(id, data) {
  const event = await Event.findByPk(id);
  if (!event) return null;
  await event.update(data);
  return event;
}

export async function deleteById(id) {
  const event = await Event.findByPk(id);
  if (!event) return false;
  await event.destroy();
  return true;
}
