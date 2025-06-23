import request from "supertest";
import app from "../index";
import sequelize from "../src/_db/sequelize.js";

describe("/api/auth", () => {
  const email = `authuser_${Date.now()}@example.com`;
  const password = "authpass123";
  const name = "Auth User";
  let cookie;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password, name });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(email);
  });

  it("should not register with duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password, name });
    expect(res.statusCode).toBe(409);
  });

  it("should login with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(email);
    cookie = res.headers["set-cookie"][0].split(";")[0];
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "wrongpass" });
    expect(res.statusCode).toBe(401);
  });

  it("should get user details when authenticated", async () => {
    const res = await request(app).get("/api/auth/user").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(email);
  });

  it("should logout the user", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });

  it("should not get user details after logout", async () => {
    const res = await request(app).get("/api/auth/user").set("Cookie", cookie);
    console.log("Status:", res.statusCode, "Body:", res.body);
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
