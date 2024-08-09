import { describe, expect, it } from "bun:test";
import app from ".";

describe("@issue/3242", () => {
  it("Should return 200 Response", async () => {
    const req = new Request("http://localhost/index.html");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });
});
