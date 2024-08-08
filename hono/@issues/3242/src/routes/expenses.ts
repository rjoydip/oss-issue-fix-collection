import { Hono } from "hono";

const expensesRoute = new Hono()

expensesRoute.get('/', (c) => c.text('GET /expenses'))
expensesRoute.post('/', (c) => c.text('POST /expenses'))

export { expensesRoute }