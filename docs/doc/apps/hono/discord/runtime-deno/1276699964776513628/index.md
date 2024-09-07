---
title: 'Hono Discord Problem 1276699964776513628'
layout: 'layouts/apps.vto'
---

# @hono/discord/problem-1276699964776513628

<https://discord.com/channels/1011308539819597844/1276699964776513628>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Provided solution here
<https://discord.com/channels/1011308539819597844/1276699964776513628/1277141663612928052>

```ts
import { Hono, TypedResponse } from "hono";

interface Response<T> {
  message: string;
  data: T;
}

const app = new Hono();

app.get("/", (c): TypedResponse<Response<string>, 200> => {
  return c.json({
    message: "success",
    data: "Hello Hono!",
  });
});
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection/git
cd oss-issue-fix-collection/hono/discord/1276699964776513628
```

To run:

```sh
deno task dev
```

open <http://localhost:8000>
