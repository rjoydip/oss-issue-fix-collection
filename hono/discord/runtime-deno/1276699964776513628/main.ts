import { Hono, TypedResponse } from 'hono'

interface Response<T> {
  message: string;
  data: T;
}

const app = new Hono()

app.get('/', (c): TypedResponse<Response<string>, 200> => {
  return c.json({
    message: 'Success',
    data: 'Hello Hono!'
  })
})

Deno.serve(app.fetch)
