import { Hono } from "hono";

const app = new Hono();

app.get("/substring/:acct", (c) => c.text(`acct is ${c.req.param("acct").substring(1)}`));
app.get("/slice/:acct", (c) => c.text(`acct is ${c.req.param("acct").slice(1)}`));
app.get("/regex/substring/:acct{@.+}", (c) =>c.text(`acct is ${c.req.param("acct").substring(1)}`));
app.get("/regex/slice/:acct{@.+}", (c) =>  c.text(`acct is ${c.req.param("acct").slice(1)}`));

export { app };
