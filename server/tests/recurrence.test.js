import { describe, it, expect } from "vitest";
import { expandRecurringEvent } from "../src/services/recurrenceService.js";

describe("recurrenceService.expandRecurringEvent", () => {
  it("expands daily recurrence within range", () => {
    const ev = {
      id: 1,
      title: "Daily",
      start_time: new Date("2025-08-01T09:00:00Z").toISOString(),
      end_time: new Date("2025-08-01T10:00:00Z").toISOString(),
      is_recurring: true,
      recurrence_type: "daily",
      // set recurrence_until to inclusive end-of-day so Aug 1..3 are included
      recurrence_until: new Date("2025-08-03T23:59:59Z").toISOString(),
    };
    const rangeStart = new Date("2025-08-01T00:00:00Z");
    const rangeEnd = new Date("2025-08-04T00:00:00Z");
    const occ = expandRecurringEvent(ev, rangeStart, rangeEnd);
    expect(occ.length).toBeGreaterThanOrEqual(3);
    expect(occ[0].start_time).toContain("2025-08-01T09:00:00");
  });

  it("expands weekly recurrence within range", () => {
    const ev = {
      id: 2,
      title: "Weekly",
      start_time: new Date("2025-08-01T09:00:00Z").toISOString(),
      end_time: new Date("2025-08-01T10:00:00Z").toISOString(),
      is_recurring: true,
      recurrence_type: "weekly",
      recurrence_until: new Date("2025-09-01T00:00:00Z").toISOString(),
    };
    const rangeStart = new Date("2025-08-01T00:00:00Z");
    const rangeEnd = new Date("2025-09-10T00:00:00Z");
    const occ = expandRecurringEvent(ev, rangeStart, rangeEnd);
    expect(occ.length).toBeGreaterThanOrEqual(4);
    expect(occ[0].start_time).toContain("2025-08-01T09:00:00");
  });

  it("expands monthly recurrence within range", () => {
    const ev = {
      id: 3,
      title: "Monthly",
      start_time: new Date("2025-01-15T09:00:00Z").toISOString(),
      end_time: new Date("2025-01-15T10:00:00Z").toISOString(),
      is_recurring: true,
      recurrence_type: "monthly",
      recurrence_until: new Date("2025-06-01T00:00:00Z").toISOString(),
    };
    const rangeStart = new Date("2025-01-01T00:00:00Z");
    const rangeEnd = new Date("2025-07-01T00:00:00Z");
    const occ = expandRecurringEvent(ev, rangeStart, rangeEnd);
    expect(occ.length).toBeGreaterThanOrEqual(5);
  });

  it("returns empty when recurrence_until is before start_time", () => {
    const ev = {
      id: 4,
      title: "Broken",
      start_time: new Date("2025-08-10T09:00:00Z").toISOString(),
      end_time: new Date("2025-08-10T10:00:00Z").toISOString(),
      is_recurring: true,
      recurrence_type: "daily",
      recurrence_until: new Date("2025-08-01T00:00:00Z").toISOString(),
    };
    const rangeStart = new Date("2025-08-01T00:00:00Z");
    const rangeEnd = new Date("2025-08-31T00:00:00Z");
    const occ = expandRecurringEvent(ev, rangeStart, rangeEnd);
    expect(occ.length).toBe(0);
  });
});
