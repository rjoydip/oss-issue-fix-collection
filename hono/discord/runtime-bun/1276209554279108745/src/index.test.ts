import { describe, expect, it } from "bun:test";
import { http } from "./http";

describe("@issue/3242", () => {
    it("Should return 200 Response", async () => {
        const name = 'hono'
        const req = new Request(`http://localhost/example?name=${name}`);
        const res = await http.request(req, {
            method: 'POST'
        });
        expect(await res.text()).toBe(JSON.stringify({ message: `Hello, ${name}!` }));
        expect(res.status).toBe(200);
    });
});
