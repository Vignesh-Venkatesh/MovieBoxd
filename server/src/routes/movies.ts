import { Hono } from "hono";
import { getMovieById, getLatestReviewsByMovie } from "../db/movies";
import {
  getMovieCredits,
  getNowPlayingMovies,
  getPopularMovies,
  getRandomMovie,
  getRecommendations,
  getSearchResults,
  getSimilarMovies,
  getUpcomingMovies,
} from "../lib/tmdb";

// initializing Hono router for movies-related routes
export const moviesRoutes = new Hono();

/**
 * GET /movies/upcoming
 * Fetches upcoming movies from TMDb.
 * Query parameters:
 *   - page: optional page number for pagination (default 1)
 */
moviesRoutes.get("/upcoming", async (c) => {
  try {
    // parsing page number from query params (default to 1)
    const page: number = parseInt(c.req.query("page") || "1");

    // fetching upcoming movies via TMDb helper function
    const result = await getUpcomingMovies(page);

    // returning successful response
    return c.json(result);
  } catch (err: any) {
    // logging unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/now-playing
moviesRoutes.get("/now-playing", async (c) => {
  try {
    // parsing page number from query params (default to 1)
    const page: number = parseInt(c.req.query("page") || "1");

    // fetching now playing movies via TMDb helper function
    const result = await getNowPlayingMovies(page);

    // returning successful response
    return c.json(result);
  } catch (err: any) {
    // logging unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/popular
moviesRoutes.get("/popular", async (c) => {
  try {
    // parsing page number from query params (default to 1)
    const page: number = parseInt(c.req.query("page") || "1");

    // fetching popular movies via TMDb helper function
    const result = await getPopularMovies(page);

    // returning successful response
    return c.json(result);
  } catch (err: any) {
    // logging unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/random
moviesRoutes.get("/random", async (c) => {
  try {
    // fetching a random movie via TMDb helper function
    const result = await getRandomMovie();

    // returning the movie data
    return c.json(result);
  } catch (err: any) {
    // logging any unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/search
moviesRoutes.get("/search", async (c) => {
  try {
    // parsing page number from query params (default to 1)
    const page: number = parseInt(c.req.query("page") || "1");

    // getting search query from 'movie' query param
    const movie: string = c.req.query("movie")?.trim() || "";

    // returning 400 if search query is empty
    if (!movie) {
      return c.json(
        { msg: "Please provide a search query", status: 400, data: [] },
        400
      );
    }

    // fetching search results via TMDb helper function
    const result = await getSearchResults(movie, page);

    // returning the search results
    return c.json(result);
  } catch (err: any) {
    // logging unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/:id/latest-reviews
moviesRoutes.get("/:id/latest-reviews", async (c) => {
  try {
    const movieId = c.req.param("id"); // getting movie ID from URL
    const limit = Number(c.req.query("limit") ?? 10); // pagination limit
    const page = Number(c.req.query("page") ?? 1); // pagination page

    // fetching latest reviews for this movie from Supabase
    const result = await getLatestReviewsByMovie(movieId, limit, page);

    // returning the reviews
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json({ msg: "Unexpected server error", status: 500 }, 500);
  }
});

// GET /movies/:id/similar
moviesRoutes.get("/:id/similar", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // getting movie ID from URL
    const page: number = parseInt(c.req.query("page") || "1"); // pagination page

    // fetching similar movies via TMDb helper
    const result = await getSimilarMovies(tmdb_id, page);

    return c.json({ msg: "Similar movies fetched", data: result, status: 200 });
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});

// GET /movies/:id/recommendations
moviesRoutes.get("/:id/recommendations", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // getting movie ID from URL
    const page: number = parseInt(c.req.query("page") || "1"); // pagination page

    // fetching recommended movies via TMDb helper
    const result = await getRecommendations(tmdb_id, page);

    return c.json({
      msg: "Recommended movies fetched",
      data: result,
      status: 200,
    });
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});

// GET /movies/:id/credits
moviesRoutes.get("/:id/credits", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // getting movie ID from URL

    // fetching cast and crew via TMDb helper
    const result = await getMovieCredits(tmdb_id);

    return c.json({ msg: "Movie credits fetched", data: result, status: 200 });
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});

// GET /movies/:id
moviesRoutes.get("/:id", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // getting movie ID from URL

    // fetching movie details from Supabase or insert from TMDb if missing
    const result = await getMovieById(tmdb_id);

    return c.json({
      msg: result.msg,
      data: result.data,
      status: result.status,
    });
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});
