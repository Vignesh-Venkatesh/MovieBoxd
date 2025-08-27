import { Hono } from "hono";
import auth from "./auth/auth";
import { moviesRoutes } from "./routes/movies";

const app = new Hono();

// mounting /auth routes
app.route("/auth", auth);

// mounting /movies routes
app.route("/movies", moviesRoutes);

app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
