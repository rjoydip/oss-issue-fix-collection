import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

app.use(
  "/*",
  serveStatic({
    root: "./static",
  }),
);

Deno.serve({ port: 3000 }, app.fetch);
