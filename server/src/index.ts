import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "./auth/auth";
import { moviesRoutes } from "./routes/movies";
import { devPicksRoutes } from "./routes/devPicks";
import { personsRoutes } from "./routes/person";
import { usersRoutes } from "./routes/users";
import { reviewsRoutes } from "./routes/reviews";
import { latestRoutes } from "./routes/latest";

const app = new Hono();

// enabling CORS for all routes
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// mounting auth-related routes at /auth
app.route("/auth", auth);

// mounting movie-related routes at /movies
app.route("/movies", moviesRoutes);

// mounting developer picks routes at /dev-picks
app.route("/dev-picks", devPicksRoutes);

// mounting person-related routes at /person
app.route("/person", personsRoutes);

// mounting user-related routes at /user
app.route("/user", usersRoutes);

// mounting review-related routes at /reviews
app.route("/reviews", reviewsRoutes);

// mounting latest routes at /latest
app.route("/latest", latestRoutes);

// root endpoint: basic API welcome message
app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

// exporting the app with Bun configuration
export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
