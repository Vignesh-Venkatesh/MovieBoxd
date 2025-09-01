import { Hono } from "hono";
import {
  addUserMovieAction,
  addUserReview,
  getUserByUsername,
  getUserFavorited,
  getUserMovieStats,
  getUserReviews,
  getUserStats,
  getUserWatched,
  getUserWatchlisted,
  removeUserMovieAction,
  removeUserReview,
} from "../db/users";

import { requireAuth } from "../auth/authMiddleWare";

export const usersRoutes = new Hono();

// GET /user/:username/movies/:movieId/status
usersRoutes.get("/:username/movies/:movieId/status", async (c) => {
  try {
    const username = c.req.param("username");
    const movieId = Number(c.req.param("movieId"));

    const result = await getUserMovieStats(username, movieId);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json({ msg: "Unexpected server error" }, 500);
  }
});

// POST /user/:username/movies/:movieId/review
usersRoutes.post("/:username/movies/:movieId/review", async (c) => {
  try {
    const authUser = await requireAuth(c);
    if (!authUser) return; // middleware already sent response

    const usernameParam = c.req.param("username");
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }

    const movieId = Number(c.req.param("movieId"));
    const body = await c.req.json();
    const { rating, review } = body;

    if (!rating || !review) {
      return c.json({ msg: "Rating and review required", status: 400 }, 400);
    }

    const result = await addUserReview(usernameParam, movieId, rating, review);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 POST review error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// DELETE /user/:username/movies/:movieId/review
usersRoutes.delete("/:username/movies/:movieId/review", async (c) => {
  try {
    const authUser = await requireAuth(c);
    if (!authUser) return;

    const usernameParam = c.req.param("username");
    console.log(authUser);
    console.log(usernameParam);
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }

    const movieId = Number(c.req.param("movieId"));
    const result = await removeUserReview(usernameParam, movieId);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 DELETE review error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// POST /user/:username/movies/:movieId/:action
usersRoutes.post("/:username/movies/:movieId/:action", async (c) => {
  const authUser = await requireAuth(c);
  if (!authUser) return; // middleware already sent response

  const usernameParam = c.req.param("username");

  // username safety check
  if (authUser.display_name !== usernameParam) {
    return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
  }

  const movieId = Number(c.req.param("movieId"));
  const action = c.req.param("action") as
    | "watched"
    | "favorited"
    | "watchlisted";

  const result = await addUserMovieAction(usernameParam, movieId, action);
  return c.json(result);
});

// DELETE /user/:username/movies/:movieId/:action
usersRoutes.delete("/:username/movies/:movieId/:action", async (c) => {
  try {
    const authUser = await requireAuth(c);
    if (!authUser) return; // middleware already sent response

    const usernameParam = c.req.param("username");

    // username safety check
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }
    const movieId = Number(c.req.param("movieId"));
    const action = c.req.param("action") as
      | "watched"
      | "favorited"
      | "watchlisted";

    const result = await removeUserMovieAction(usernameParam, movieId, action);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 DELETE error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// GET /user/:username/reviews?limit=5&page=2
usersRoutes.get("/:username/reviews", async (c) => {
  try {
    const username = c.req.param("username");
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    const result = await getUserReviews(username, limit, page);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:username/watched?limit=10&page=1
usersRoutes.get("/:username/watched", async (c) => {
  try {
    const username = c.req.param("username");
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    const result = await getUserWatched(username, limit, page);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:username/favorites?limit=10&page=1
usersRoutes.get("/:username/favorites", async (c) => {
  try {
    const username = c.req.param("username");
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    const result = await getUserFavorited(username, limit, page);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:username/watchlist?limit=10&page=1
usersRoutes.get("/:username/watchlist", async (c) => {
  try {
    const username = c.req.param("username");
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    const result = await getUserWatchlisted(username, limit, page);
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
