# @hono/issue-3254

[https://github.com/honojs/hono/3254](https://github.com/honojs/hono/3254)

## Solution

Provided solution here
[3254#issuecomment-2279494130](https://github.com/honojs/hono/issues/3254#issuecomment-2279494130)

```ts
app.get("/slice/:acct", (c) => c.text(`acct is ${c.req.param("acct").slice(1)}`));
// or
app.get("/regex/slice/:acct{@.+}", (c) =>  c.text(`acct is ${c.req.param("acct").slice(1)}`));
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-solving/git
cd oss-issue-solving/hono/3254
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
