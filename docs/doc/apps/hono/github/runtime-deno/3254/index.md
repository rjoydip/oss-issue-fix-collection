---
title: 'Hono Github Issue 3254'
layout: 'layouts/apps.vto'
---

# @hono/github/issue-3254

<https://github.com/honojs/hono/3254>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Provided solution here
[https://github.com/honojs/hono/issues/3254#issuecomment-22794941300](https://github.com/honojs/hono/issues/3254#issuecomment-2279494130)

```ts
app.get(
  "/slice/:acct",
  (c) => c.text(`acct is ${c.req.param("acct").slice(1)}`),
);
// or
app.get(
  "/regex/slice/:acct{@.+}",
  (c) => c.text(`acct is ${c.req.param("acct").slice(1)}`),
);
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection/git
cd oss-issue-fix-collection/hono/github/3254
```

To run:

```sh
deno task dev
```

open <http://localhost:8000>

To test:

```sh
deno test
```

To benchmark:

```sh
deno bench
```
