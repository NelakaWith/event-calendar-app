import request from "supertest";
import app from "../index";
import { User } from "../src/models/user.js";
import { Event } from "../src/models/event.js";
import sequelize from "../src/_db/sequelize.js";

// Helper to create a user and get a JWT cookie
async function registerAndLogin() {
  const email = `testuser_${Date.now()}@example.com`;
  const password = "testpass123";
  const name = "Test User";
  // Register
  await request(app).post("/api/auth/register").send({ email, password, name });
  // Login
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });
  const cookie = res.headers["set-cookie"][0].split(";")[0];
  return { cookie, user: res.body.user };
}

describe("/api/events", () => {
  let cookie, eventId;

  beforeAll(async () => {
    try {
      await sequelize.sync({ force: true });
    } catch (err) {
      console.error("[SEQUELIZE SYNC ERROR]", err);
      throw err;
    }
    ({ cookie } = await registerAndLogin());
  });

  it("should require authentication", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(401);
  });

  it("should create an event", async () => {
    const eventData = {
      title: "Test Event",
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 3600000).toISOString(),
    };
    const res = await request(app)
      .post("/api/events")
      .set("Cookie", cookie)
      .send(eventData);
    expect(res.statusCode).toBe(201);
    expect(res.body.event.title).toBe("Test Event");
    eventId = res.body.event.id;
  });

  it("should fetch all events", async () => {
    const res = await request(app).get("/api/events").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body.events.length).toBeGreaterThan(0);
  });

  it("should fetch a single event by ID", async () => {
    const res = await request(app)
      .get(`/api/events/${eventId}`)
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body.event.id).toBe(eventId);
  });

  it("should update an event", async () => {
    const res = await request(app)
      .put(`/api/events/${eventId}`)
      .set("Cookie", cookie)
      .send({ title: "Updated Event" });
    expect(res.statusCode).toBe(200);
    expect(res.body.event.title).toBe("Updated Event");
  });

  it("should delete an event", async () => {
    const res = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    // Confirm deletion
    const fetchRes = await request(app)
      .get(`/api/events/${eventId}`)
      .set("Cookie", cookie);
    expect(fetchRes.statusCode).toBe(404);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
