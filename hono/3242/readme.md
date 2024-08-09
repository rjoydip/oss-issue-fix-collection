# @hono/issue-3242

[https://github.com/honojs/hono/issue/3242](https://github.com/honojs/hono/issue/3242)

## Solution

Please check [https://github.com/honojs/hono/issue/3242#issuecomment-2275418065](https://github.com/honojs/hono/issue/3242#issuecomment-2275418065) of solution being provided.

> **Not working**

```ts
app.get("*", serveStatic({ root: "./public" }));
app.get("*", serveStatic({ path: "./public/index.html" })); // fallback
```

> **Working**

```ts
app.get("*", serveStatic({ root: `${relative(process.cwd(), __dirname)}/../client/dist/` }));
app.get("*", serveStatic({ path: `${relative(process.cwd(), __dirname)}/client/dist/index.html` })); // fallback
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-solving/git
cd oss-issue-solving/hono/3242
```

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open <http://localhost:3000/index.html>

To test:

```sh
bun test
```
