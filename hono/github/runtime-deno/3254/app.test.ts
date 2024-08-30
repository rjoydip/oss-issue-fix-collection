import { assertEquals } from "@std/assert";
import { app } from "./app.ts";

Deno.test({
  name: "should validate the endpoint for /substring/@alex",
  sanitizeResources: false,
  async fn() {
    const res = await app.request("http://localhost/substring/@alex");
    const text = await res.text();
    assertEquals(res.status, 200);
    assertEquals(text, "acct is alex");
  },
});

Deno.test({
  name: "should validate the endpoint for /slice/@alex",
  sanitizeResources: false,
  async fn() {
    const res = await app.request("http://localhost/slice/@alex");
    const text = await res.text();
    assertEquals(res.status, 200);
    assertEquals(text, "acct is alex");
  },
});

Deno.test({
  name: "should validate the endpoint for /regex/substring/@alex",
  sanitizeResources: false,
  async fn() {
    const res = await app.request("http://localhost/regex/substring/@alex");
    const text = await res.text();
    assertEquals(res.status, 200);
    assertEquals(text, "acct is alex");
  },
});

Deno.test({
  name: "should validate the endpoint for /regex/slice/@alex",
  sanitizeResources: false,
  async fn() {
    const res = await app.request("http://localhost/regex/slice/@alex");
    const text = await res.text();
    assertEquals(res.status, 200);
    assertEquals(text, "acct is alex");
  },
});