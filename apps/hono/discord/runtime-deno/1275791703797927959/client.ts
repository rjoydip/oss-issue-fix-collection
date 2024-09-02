import { hc } from "hono/client";
import { AppType } from "./server.ts";

const client = hc<AppType>("http://localhost:8787/");

const validateStringResponse = await client["validate-string"].$post({
  form: {
    body: "hello!",
  },
});

if (validateStringResponse.ok) {
  const data = await validateStringResponse.json();
  console.log(data);
}

const validateArrayResponse = await client["validate-array"].$post({
  form: {
    body: ["world", "hello"],
  },
});

if (validateArrayResponse.ok) {
  const data = await validateArrayResponse.json();
  console.log(data);
}
