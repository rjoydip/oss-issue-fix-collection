---
title: 'Hono Github Issue 3271'
layout: ''
---

# @hono/github/issue-3271

<https://github.com/honojs/hono/issue/3271>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Please check
<https://github.com/honojs/hono/issues/3271#issuecomment-2302675787>
of solution being provided.

> **Not working**

```ts
app.use(async (c,next) => {
  await sleep(1)// Anything that uses "await
  await next()
})
```

> **Working**

```ts
app.use(async (_, next) => {
  await next()
  await sleep(1)
})
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection.git
cd oss-issue-fix-collection/honojs/hono/github/3271
```

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

Make a post request (Form urlencoded)

To test:

```sh
bun test
```
