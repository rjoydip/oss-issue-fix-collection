---
title: 'Hono Discord Problem 1276209554279108745'
layout: ''
---

# @hono/discord/problem-1276209554279108745

Provided solution here <https://discord.com/channels/1011308539819597844/1276209554279108745/1276928165155180565>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Without Promise

```ts
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
```

With Promise

```ts
import { HttpBindings, serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const http = new Hono<{ Bindings: HttpBindings }>();

http.post('/example', zValidator('query', z.object({ name: z.string() })), async (c) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1)); // Removing this line prints "Hello" to the console.

  c.env.incoming.pipe(process.stdout);

  return c.json({ message: 'Hello, World!' }, 200);
});

serve({
  fetch: http.fetch,
  hostname: 'localhost',
  port: 1337,
});
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection/git
cd oss-issue-fix-collection/hono/discord/1276209554279108745
```

To run:

```sh
deno task dev
```

open <http://localhost:8000>
