import { supabase } from "../db/db";
import { insertMovieFromTMDB } from "../lib/tmdb";

/**
 * getMovieById
 * -------------
 * Fetches a movie from the database by TMDb ID. If the movie does not exist,
 * it will attempt to fetch the movie from TMDb and insert it into the database.
 *
 * Params:
 * - tmdb_id: string = TMDb movie ID
 *
 * Returns:
 * - { msg, data, status, error? }
 */

export async function getMovieById(tmdb_id: string) {
  try {
    // checking if the movie already exists in Supabase
    const { data: existing, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", Number(tmdb_id))
      .maybeSingle();

    if (error) {
      // database query error
      return {
        msg: "Error querying database",
        data: null,
        error: error,
        status: 500,
      };
    }

    if (existing) {
      // movie found in database
      return {
        msg: "Movie fetched from database",
        data: existing,
        status: 200,
      };
    }

    // movie not found in DB - fetch from TMDb and insert
    const insertedMovie = await insertMovieFromTMDB(tmdb_id);

    if (insertedMovie.status >= 400) {
      // TMDb fetch or insertion failed
      return {
        msg: insertedMovie.msg,
        data: null,
        status: insertedMovie.status,
      };
    }

    // movie successfully inserted - return it
    return {
      msg: "Movie fetched from database",
      data: insertedMovie.data,
      status: 200,
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * getLatestReviewsByMovie
 * -----------------------
 * Fetches the latest reviews for a given movie from the database.
 * Supports pagination.
 *
 * Params:
 * - movieId: string = internal Supabase movie ID
 * - limit: number = number of reviews per page (default 5)
 * - page: number = pagination page (default 1)
 *
 * Returns:
 * - { msg, data, status, error? }
 */
export async function getLatestReviewsByMovie(
  movieId: string,
  limit = 5,
  page = 1
) {
  try {
    const offset = (page - 1) * limit;

    // query the reviews table with related profiles (user info)
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(
        `
        id,
        review,
        rating,
        created_at,
        profiles (
          id,
          display_name,
          avatar_url
        )
      `
      )
      .eq("movie_id", movieId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1); // pagination

    if (error) {
      return {
        msg: "Error querying database",
        data: null,
        error,
        status: 500,
      };
    }

    return {
      msg: "Latest reviews for movie fetched from database",
      data: reviews,
      status: 200,
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}
