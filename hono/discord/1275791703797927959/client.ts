import { hc } from "hono/client";
import { AppType } from "./server.ts";

const client = hc<AppType>('http://localhost:8787/')

const res = await client.index.$get({
  query: {
    id: '123',
  },
})

if (res.ok) {
  const data: { message: string } = await res.json()
  console.log(data.message)
}