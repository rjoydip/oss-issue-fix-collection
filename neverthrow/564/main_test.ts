import { assertSnapshot } from "jsr:@std/testing@1.0.0/snapshot";
import { isPromiseAllOK, isPromiseAllSettledOK } from "./main.ts";

Deno.test("testIsPromiseAllSettledOK", async function (t):  Promise<void> {
  const result = await isPromiseAllSettledOK<string | number>([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve(1),
  ])
    
  await assertSnapshot(t, result);
});

Deno.test("testIsPromiseAllOK", async function (t):  Promise<void> {
  const result = await isPromiseAllOK<string | number>([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve(1),
  ])
    
  await assertSnapshot(t, result);
});