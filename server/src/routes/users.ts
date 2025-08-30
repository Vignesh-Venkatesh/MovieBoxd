import { Hono } from "hono";
import {
  getUserByUsername,
  getUserFavorited,
  getUserStats,
  getUserWatched,
  getUserWatchlisted,
} from "../db/users";

export const usersRoutes = new Hono();

// GET /user/:id/watched
usersRoutes.get("/:username/watched", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserWatched(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:id/favorites
usersRoutes.get("/:username/favorites", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserFavorited(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:id/watchlist
usersRoutes.get("/:username/watchlist", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserWatchlisted(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:id/stats
usersRoutes.get("/:username/stats", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserStats(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:id
usersRoutes.get("/:username", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserByUsername(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
