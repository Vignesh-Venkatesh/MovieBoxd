import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "./auth/auth";
import { moviesRoutes } from "./routes/movies";
import { devPicksRoutes } from "./routes/devPicks";

const app = new Hono();

// CORS
app.use(
  "/*",
  cors({
    origin: (origin) => {
      if (Bun.env.ENVIRONMENT === "production") {
        // allowing only front end in production
        return "https://movieboxd.vigneshvenkatesh.com";
      }
      // allow all origins in dev (localhost)
      return origin;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// mounting /auth routes
app.route("/auth", auth);

// mounting /movies routes
app.route("/movies", moviesRoutes);

// mounting /dev-picks routes
app.route("/dev-picks", devPicksRoutes);

app.get("/", (c) => {
  return c.json({ msg: "Welcome to MovieBoxd API!", status: 200 }, 200);
});

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
