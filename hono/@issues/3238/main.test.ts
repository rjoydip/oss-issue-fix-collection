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
  name: "should validate static assets path when strict is false - resolved",
  sanitizeResources: false,
  async fn() {
    const app = new Hono({
      strict: false,
    });

    app.use(
      "*",
      serveStatic({
        root: "./static",
        rewriteRequestPath: (path) => {
          return path.replace("/hello.world", "/hello.world/");
        },
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