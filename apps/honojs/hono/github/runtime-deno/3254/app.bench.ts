import { app } from "./app.ts";

Deno.bench({
  name: "/regex/substring/:acct{@.+}",
  group: "routing",
  fn: async () => {
    await app.request("http://localhost/regex/substring/@alex");
  },
});

Deno.bench({
  name: "/substring/:acct",
  group: "routing",
  fn: async () => {
    await app.request("http://localhost/substring/@alex");
  },
});

Deno.bench({
  name: "/slice/:acct",
  group: "routing",
  fn: async () => {
    await app.request("http://localhost/slice/@alex");
  },
});

Deno.bench({
  name: "/regex/slice/:acct{@.+}",
  group: "routing",
  fn: async () => {
    await app.request("http://localhost/regex/slice/@alex");
  },
});
