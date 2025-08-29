import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "./auth/auth";
import { moviesRoutes } from "./routes/movies";
import { devPicksRoutes } from "./routes/devPicks";
import { personsRoutes } from "./routes/person";
import { usersRoutes } from "./routes/users";

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

// mounting /person routes
app.route("/person", personsRoutes);

// mounting /user routes
app.route("/user", usersRoutes);

app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
