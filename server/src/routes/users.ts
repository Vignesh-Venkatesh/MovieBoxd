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

// initializing Hono router for user-related routes
export const usersRoutes = new Hono();

// GET /user/:username/movies/:movieId/status
usersRoutes.get("/:username/movies/:movieId/status", async (c) => {
  try {
    // extracting username and movieId from URL parameters
    const username = c.req.param("username");
    const movieId = Number(c.req.param("movieId"));

    // fetching the user's movie-specific stats (watched, favorited, watchlisted, review)
    const result = await getUserMovieStats(username, movieId);

    // returning the result as JSON
    return c.json(result);
  } catch (err: any) {
    // handling unexpected errors
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json({ msg: "Unexpected server error" }, 500);
  }
});

// POST /user/:username/movies/:movieId/review
usersRoutes.post("/:username/movies/:movieId/review", async (c) => {
  try {
    // requiring authentication and get the logged-in user
    const authUser = await requireAuth(c);
    if (!authUser) return; // middleware already sent response if not authenticated

    // getting username from URL parameter
    const usernameParam = c.req.param("username");

    // ensuring the authenticated user matches the username in URL
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }

    // getting movieId from URL and request body data
    const movieId = Number(c.req.param("movieId"));
    const body = await c.req.json();
    const { rating, review } = body;

    // validating required field
    if (rating === undefined || rating === null) {
      return c.json({ msg: "Rating is required", status: 400 }, 400);
    }

    // adding or update the user review
    const result = await addUserReview(
      usernameParam,
      movieId,
      rating,
      review ?? null
    );

    // returning success response
    return c.json(result);
  } catch (err: any) {
    // handling unexpected errors
    console.error("🛑 POST review error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// DELETE /user/:username/movies/:movieId/review
usersRoutes.delete("/:username/movies/:movieId/review", async (c) => {
  try {
    // requiring authentication and get the logged-in user
    const authUser = await requireAuth(c);
    if (!authUser) return; // middleware already sent response if not authenticated

    // getting username from URL parameter
    const usernameParam = c.req.param("username");

    // ensuring the authenticated user matches the username in URL
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }

    // getting movieId from URL
    const movieId = Number(c.req.param("movieId"));

    // removing the user review
    const result = await removeUserReview(usernameParam, movieId);

    // returning success response
    return c.json(result);
  } catch (err: any) {
    // handling unexpected errors
    console.error("🛑 DELETE review error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// POST /user/:username/movies/:movieId/:action
// adds a movie action (watched, favorited, or watchlisted) for the authenticated user
usersRoutes.post("/:username/movies/:movieId/:action", async (c) => {
  // authenticating the user
  const authUser = await requireAuth(c);
  if (!authUser) {
    return;
  } // if not authenticated, middleware already sent response

  // extracting the username from URL params
  const usernameParam = c.req.param("username");

  // ensuring the authenticated user matches the username in the URL
  if (authUser.display_name !== usernameParam) {
    return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
  }

  // getting the movie ID and action type from URL params
  const movieId = Number(c.req.param("movieId"));
  const action = c.req.param("action") as
    | "watched"
    | "favorited"
    | "watchlisted";

  // calling the database function to add the movie action
  const result = await addUserMovieAction(usernameParam, movieId, action);

  // returning the result as JSON
  return c.json(result);
});

// DELETE /user/:username/movies/:movieId/:action
// removes a movie action (watched, favorited, or watchlisted) for the authenticated user
usersRoutes.delete("/:username/movies/:movieId/:action", async (c) => {
  try {
    // athenticating the user
    const authUser = await requireAuth(c);
    if (!authUser) {
      return;
    } // if not authenticated, middleware already sent response

    // extracting the username from URL params
    const usernameParam = c.req.param("username");

    // ensuring the authenticated user matches the username in the URL
    if (authUser.display_name !== usernameParam) {
      return c.json({ msg: "Forbidden: user mismatch", status: 403 }, 403);
    }

    // getting the movie ID and action type from URL params
    const movieId = Number(c.req.param("movieId"));
    const action = c.req.param("action") as
      | "watched"
      | "favorited"
      | "watchlisted";

    // calling the database function to remove the movie action
    const result = await removeUserMovieAction(usernameParam, movieId, action);

    // returning the result as JSON
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 DELETE error:", err.message || err);
    return c.json({ msg: err.message || "Unexpected server error" }, 500);
  }
});

// GET /user/:username/reviews?limit=5&page=2
// fetches paginated reviews of a specific user
usersRoutes.get("/:username/reviews", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // extracting pagination query parameters, defaulting to 10 per page and page 1
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching user reviews from the database
    const result = await getUserReviews(username, limit, page);

    // returning the reviews as JSON
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
// fetches a paginated list of movies the user has marked as watched
usersRoutes.get("/:username/watched", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // extracting pagination query parameters, defaulting to 10 per page and page 1
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching the watched movies for the user from the database
    const result = await getUserWatched(username, limit, page);

    // returning the watched movies as JSON
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
// fetches a paginated list of movies the user has marked as favorites
usersRoutes.get("/:username/favorites", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // extracting pagination query parameters, defaulting to 10 per page and page 1
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching the user's favorited movies from the database
    const result = await getUserFavorited(username, limit, page);

    // returning the favorites as JSON
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
// fetches a paginated list of movies the user has added to their watchlist
usersRoutes.get("/:username/watchlist", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // extracting pagination query parameters, defaulting to 10 per page and page 1
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching the user's watchlisted movies from the database
    const result = await getUserWatchlisted(username, limit, page);

    // returning the watchlist as JSON
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:username/stats
// fetches overall statistics for a user (e.g., number of watched, favorited, watchlisted movies and reviews)
usersRoutes.get("/:username/stats", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // fetching user statistics from the database
    const result = await getUserStats(username);

    // returning the stats as JSON
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /user/:username
// fetches a user's profile information by their username
usersRoutes.get("/:username", async (c) => {
  try {
    // extracting username from URL parameters
    const username = c.req.param("username");

    // querying the database for the user's profile
    const result = await getUserByUsername(username);

    // returning the user profile as JSON
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
