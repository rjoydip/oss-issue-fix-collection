# @hono/issues-3242

[https://github.com/honojs/hono/issues/3242](https://github.com/honojs/hono/issues/3242)

## Solution

Provided solution here [3238#issuecomment-2278379005](https://github.com/honojs/hono/issues/3238#issuecomment-2278379005)

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
git clone https://github.com/rjoydip/oss-issue-solving/git
cd oss-issue-solving/hono/@issues/3238
```

To test:

```sh
deno test --allow-read --quiet
```
