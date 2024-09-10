---
title: 'Hono Github Issue 3275'
layout: ''
---

# @hono/github/issue-3275

<https://github.com/honojs/hono/3275>

## Contents

* [Solution](#solution)
* [Setup](#setup)

## Solution

Provided solution here
<https://github.com/honojs/hono/issues/3275#issuecomment-2294830487>

Actual typo is <https://github.com/honojs/hono/issues/3275#issuecomment-2295853901>

```ts
define: {
    global: 'globalThis',
},
```

## Setup

To clone:

```sh
git clone https://github.com/rjoydip/oss-issue-fix-collection.git
cd oss-issue-fix-collection/honojs/hono/github/3275
```

To install server deps

```sh
cd server
pnpm i
```

To install client deps

```sh
cd client
pnpm i
```

To run client app:

```sh
cd server
pnpm run dev
```

open <http://localhost:5001/api>

To run server app:

```sh
cd client
pnpm start
```

open <http://localhost:3000/api>
