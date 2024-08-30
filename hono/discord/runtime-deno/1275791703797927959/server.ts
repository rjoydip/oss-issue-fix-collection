import { Hono } from "hono";
import { validator } from "hono/validator";
import z from "zod";

const app = new Hono().post(
  "/validate-string",
  validator("form", (value, c) => {
    const parsed = z.object({
      body: z.string(),
    }).safeParse(value);
    if (!parsed.success) {
      return c.text("Invalid!", 401);
    }
    return parsed.data;
  }),
  async (c) => {
    const data = await c.req.formData();
    return c.json({
      endpoint: c.req.path,
      message: data.get("body"),
    }, 200);
  },
).post(
  "/validate-array",
  validator("form", (value, c) => {
    const parsed = z.object({
      body: z.array(z.string()),
    }).safeParse(value);
    if (!parsed.success) {
      return c.text("Invalid!", 401);
    }
    return parsed.data;
  }),
  async (c) => {
    const data = await c.req.formData();
    return c.json({
      endpoint: c.req.path,
      message: data.getAll("body"),
    }, 200);
  },
);

Deno.serve({ port: 8787 }, app.fetch);
export type AppType = typeof app;
