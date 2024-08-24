import { HttpBindings, serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const http = new Hono<{ Bindings: HttpBindings }>();

http.post('/example', zValidator('query', z.object({ name: z.string() })), async (c) => {
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 1)); // Removing this line prints "Hello" to the console.

  c.env.incoming.pipe(process.stdout);

  return c.json({ message: 'Hello, World!' }, 200);
});

serve({
  fetch: http.fetch,
  hostname: 'localhost',
  port: 1337,
});