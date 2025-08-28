import { Hono } from "hono";
import { supabase } from "../db/db";

export const devPicksRoutes = new Hono();

// GET /dev-picks
devPicksRoutes.get("/", async (c) => {
  try {
    const { data, error } = await supabase
      .from("dev_picks")
      .select("tmdb_id, movies(*)");

    // if error
    if (error) {
      return c.json(
        { msg: "Error querying database", data: null, error, status: 500 },
        { status: 500 }
      );
    }

    // if successful
    return c.json(
      { msg: "Dev picks fetched successfully", data, status: 200 },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
