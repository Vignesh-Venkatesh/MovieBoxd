import { supabase } from "../db/db";

export async function getLatestReviews(limit = 10, page = 1) {
  try {
    const offset = (page - 1) * limit;

    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(
        `
    id,
    review,
    rating,
    created_at,
    movies (
      id,
      title,
      poster_path,
      release_date
    ),
    profiles (
      id,
      display_name,
      avatar_url
    )
  `
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // some database error
      return {
        msg: "Error querying database",
        data: null,
        error: error,
        status: 500,
      };
    }

    if (reviews) {
      return {
        msg: "Latest reviews fetched from database",
        data: reviews,
        status: 200,
      };
    }
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}
