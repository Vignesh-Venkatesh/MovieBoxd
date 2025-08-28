import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "./auth/auth";
import { moviesRoutes } from "./routes/movies";
import { devPicksRoutes } from "./routes/devPicks";
import { peoplesRoutes } from "./routes/people";

const app = new Hono();

// CORS
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// mounting /auth routes
app.route("/auth", auth);

// mounting /movies routes
app.route("/movies", moviesRoutes);

// mounting /dev-picks routes
app.route("/dev-picks", devPicksRoutes);

// mounting /people routes
app.route("/people", peoplesRoutes);

app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
