import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { assertEquals } from "@std/assert";

Deno.test({
  name: "should validate static assets path contains !",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request("http://localhost/hello!world/");
    assertEquals(res_1.status, 404);

    const res_2 = await app.request("http://localhost/hello!world/index.html");
    assertEquals(res_2.status, 404);
  },
});

Deno.test({
  name: "should validate static assets path contains -",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request("http://localhost/hello-world/");
    assertEquals(res_1.status, 200);
    const res_2 = await app.request("http://localhost/hello-world/index.html");
    assertEquals(res_2.status, 200);
  },
});

Deno.test({
  name: "should validate static assets path contains .",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request(
      "http://localhost/hello.world/",
    );
    assertEquals(res_1.status, 200);
    const res_2 = await app.request(
      "http://localhost/hello.world/index.html",
    );
    assertEquals(res_2.status, 200);
  },
});

Deno.test({
  name: "should validate static assets path contains _",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request(
      "http://localhost/hello.world",
    );
    assertEquals(res_1.status, 200);
    const res_2 = await app.request(
      "http://localhost/hello.world/index.html",
    );
    assertEquals(res_2.status, 200);
  },
});

Deno.test({
  name: "should validate static assets path contains #",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request(
      "http://localhost/hello#world/",
    );
    assertEquals(res_1.status, 200);
    const res_2 = await app.request(
      "http://localhost/hello#world/index.html",
    );
    assertEquals(res_2.status, 200);
  },
});

Deno.test({
  name: "should validate static assets path contains @",
  sanitizeResources: false,
  async fn() {
    const app = new Hono();

    app.use(
      "/*",
      serveStatic({
        root: "./static",
      }),
    );
    const res_1 = await app.request(
      "http://localhost/hello#world/",
    );
    assertEquals(res_1.status, 200);
    const res_2 = await app.request(
      "http://localhost/hello#world/index.html",
    );
    assertEquals(res_2.status, 200);
  },
});

Deno.test({
  name: "should validate endpoint GET /",
  async fn() {
    const app = new Hono();
    app.get("/", (c) => c.text("Please test me"));
    const res = await app.request("http://localhost/");
    assertEquals(res.status, 200);
  },
});
