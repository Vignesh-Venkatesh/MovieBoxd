import { Hono } from "hono";
import { supabase } from "../db/db";

// initializing Hono router for dev picks
export const devPicksRoutes = new Hono();

/**
 * GET /dev-picks
 * Fetches developer-picked movies along with their TMDb data.
 */
devPicksRoutes.get("/", async (c) => {
  try {
    // querying dev_picks table and include related movie details
    const { data, error } = await supabase
      .from("dev_picks")
      .select("tmdb_id, movies(*)"); // fetching all movie columns via relation

    // handling database query error
    if (error) {
      return c.json(
        {
          msg: "Error querying database",
          data: null,
          error,
          status: 500,
        },
        { status: 500 }
      );
    }

    // returning successful response with dev picks data
    return c.json(
      {
        msg: "Dev picks fetched successfully",
        data,
        status: 200,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // catching unexpected runtime errors
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      {
        msg: "Unexpected server error",
        data: null,
        status: 500,
      },
      { status: 500 }
    );
  }
});
