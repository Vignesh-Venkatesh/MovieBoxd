import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
