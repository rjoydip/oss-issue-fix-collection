import { Hono } from "hono"

const app = new Hono().get(
  '/',
  (c) => {
    return c.json({ message: 'hello' }, 200)
  }
)

Deno.serve({ port: 8787 }, app.fetch) 

export type AppType = typeof app