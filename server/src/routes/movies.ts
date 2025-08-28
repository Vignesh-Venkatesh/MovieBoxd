import { Hono } from "hono";
import { getMovieById } from "../db/movies";
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

export const moviesRoutes = new Hono();

// GET /movies/upcoming
moviesRoutes.get("/upcoming", async (c) => {
  try {
    const page: number = parseInt(c.req.query("page") || "1"); // getting page number
    const result = await getUpcomingMovies(page);
    return c.json(result);
  } catch (err: any) {
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
    const page: number = parseInt(c.req.query("page") || "1"); // getting page number
    const result = await getNowPlayingMovies(page);
    return c.json(result);
  } catch (err: any) {
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
    const page: number = parseInt(c.req.query("page") || "1"); // getting page number
    const result = await getPopularMovies(page);
    return c.json(result);
  } catch (err: any) {
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
    const result = await getRandomMovie();
    return c.json(result);
  } catch (err: any) {
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
    const page: number = parseInt(c.req.query("page") || "1"); // getting page numberpage

    const movie: string = c.req.query("movie")?.trim() || ""; // getting movie
    // if movie is not provided
    if (!movie) {
      return c.json(
        { msg: "Please provide a search query", status: 400, data: [] },
        400
      );
    }

    const result = await getSearchResults(movie, page);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/:id/similar
moviesRoutes.get("/:id/similar", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // get movie ID from URL
    const page: number = parseInt(c.req.query("page") || "1"); // getting page number
    const result = await getSimilarMovies(tmdb_id, page);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/:id/recommendations
moviesRoutes.get("/:id/recommendations", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // get movie ID from URL
    const page: number = parseInt(c.req.query("page") || "1"); // getting page number
    const result = await getRecommendations(tmdb_id, page);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/:id/credits
moviesRoutes.get("/:id/credits", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // get movie ID from URL
    const result = await getMovieCredits(tmdb_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /movies/:id
moviesRoutes.get("/:id", async (c) => {
  try {
    const tmdb_id = c.req.param("id"); // get movie ID from URL

    const result = await getMovieById(tmdb_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
