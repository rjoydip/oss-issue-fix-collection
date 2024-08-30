import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'

const app = new Hono()

app.use(bodyLimit({ maxSize: 1024 * 1024 * 10 }))

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

app.use(async (_, next) => {
  await next()
  await sleep(1000)
})

app.post('/', async (c) => {
  const body = await c.req.formData()
  return c.text(String(body.get('test')))
})

export default app