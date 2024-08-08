import { relative } from "node:path";
import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.route("/api/expenses", expensesRoute);

/* Not working */
// app.get("*", serveStatic({ root: "./public" }));
// app.get("*", serveStatic({ path: "./public/index.html" })); // fallback

/* Working */
// app.get("*", serveStatic({ root: `${relative(process.cwd(), __dirname)}/../client/dist/` }));
// app.get("*", serveStatic({ path: `${relative(process.cwd(), __dirname)}/client/dist/index.html` })); // fallback

export default app;