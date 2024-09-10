import { Env, Hono, Input, MiddlewareHandler, TypedResponse } from "hono";
import { createMiddleware } from "hono/factory";

interface Response<T> {
  message: string;
  data: T;
}

const app = new Hono<Env>();

const authMiddleware = <
  E extends Env,
  P extends string,
  I extends Input,
>(message: string = "Hello!"): MiddlewareHandler<E, P, I> => {
  return createMiddleware(async (c, next) => {
    await next();
    c.res.headers.append("X-Message", message);
    c.body("");
  });
};

app.get("/", authMiddleware(), (c) => {
  return c.json({
    message: "Success",
    data: "Hello Hono!",
  });
});

app.post("/", (c): TypedResponse<Response<string>, 200> => {
  return c.json({
    message: "Success",
    data: "Hello Hono!",
  });
});

Deno.serve(app.fetch);
