import { Hono } from "hono";
import { getMovieById } from "../db/movies";

export const moviesRoutes = new Hono();

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
