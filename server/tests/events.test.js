import request from "supertest";
import app from "../index"; // Adjust if your Express app is exported elsewhere

describe("GET /api/events", () => {
  it("should require authentication", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(401);
  });
});
