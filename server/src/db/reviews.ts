import { supabase } from "../db/db";

/**
 * getLatestReviews
 * ----------------
 * Fetches the latest reviews from the database across all movies.
 * Supports pagination and includes related movie & user info.
 *
 * Params:
 * - limit: number = number of reviews per page (default 10)
 * - page: number = pagination page number (default 1)
 *
 * Returns:
 * - { msg, data, status, error? }
 *
 * Notes:
 * - Includes related `movies` info (id, title, poster, release date)
 * - Includes related `profiles` info (id, display_name, avatar_url)
 */
export async function getLatestReviews(limit = 10, page = 1) {
  try {
    const offset = (page - 1) * limit;

    // querying the reviews table with related movies and profiles
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
      .order("created_at", { ascending: false }) // latest reviews first
      .range(offset, offset + limit - 1); // pagination

    if (error) {
      // database query failed
      return {
        msg: "Error querying database",
        data: null,
        error: error,
        status: 500,
      };
    }

    if (reviews) {
      // successfully fetched reviews
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
