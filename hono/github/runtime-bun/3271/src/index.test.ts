import { describe, expect, it } from "bun:test";
import app from ".";

describe("validate hono #3271", () => {
	it("should valid form data", async () => {
		const formData = new URLSearchParams();
		formData.append("test", "hello");

		const res = await app.request("/", {
			body: formData,
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/x-www-form-urlencoded",
			}),
		});
		const text = await res.text();

		expect(text).toBe("hello");
		expect(res.status).toBe(200);
	});
});
