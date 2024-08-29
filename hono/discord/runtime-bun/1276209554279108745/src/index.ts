import { serve } from "@hono/node-server";
import { http } from "./http";

serve({
  fetch: http.fetch,
  hostname: "127.0.0.1",
  port: 1337,
});
