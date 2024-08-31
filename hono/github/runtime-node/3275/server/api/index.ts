import { handle } from "@hono/node-server/vercel";
import { Hono } from "hono";

const app = new Hono()
	.basePath("/api")

	.get("/", (c) => {
		return c.json({ message: "Hello Hono!" });
	})

	.post("/pricing", async (c) => {
		const data = await c.req.json();

		return c.json({ success: true, data }, 200);
	});

export type ApiTestRoutes = typeof app;

export default handle(app);
