---
title: 'Hono Github Issue 3238'
layout: 'layouts/apps.vto'
---

# @hono/github/issue-3238

<https://github.com/honojs/hono/3238>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Provided solution here
<https://github.com/honojs/hono/3238#issuecomment-2278379005>

```diff
app.use(
    "*",
    serveStatic({
        root: "./static",
+        rewriteRequestPath: (path) => {
+           return path.replace("/hello.world", "/hello.world/");
+       },
    }),
);
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection/git
cd oss-issue-fix-collection/hono/github/3238
```

To test:

```sh
deno test --allow-read --quiet
```
