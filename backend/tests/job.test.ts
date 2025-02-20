import request from "supertest";
import app from "../src/index"; // Update with your Express app path

describe("Job API", () => {
  it("should fetch jobs successfully", async () => {
    const res = await request(app).get("/api/jobs");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.jobs)).toBe(true);
  });

  it("should return filtered jobs when category is provided", async () => {
    const res = await request(app).get("/api/jobs?category=Software");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should return sorted jobs when sort query is used", async () => {
    const res = await request(app).get("/api/jobs?sort=latest");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
