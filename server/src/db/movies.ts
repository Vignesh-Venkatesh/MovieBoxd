import { supabase } from "../db/db";
import { insertMovieFromTMDB } from "../lib/tmdb";

export async function getMovieById(tmdb_id: string) {
  try {
    // check if movie already exists in supabase
    const { data: existing, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", Number(tmdb_id))
      .maybeSingle();

    if (error) {
      // some database error
      return {
        msg: "Error querying database",
        data: null,
        error: error,
        status: 500,
      };
    }

    if (existing) {
      return {
        msg: "Movie fetched from database",
        data: existing,
        status: 200,
      };
    }

    // movie not found in database, then we try to insert from TMDb
    const insertedMovie = await insertMovieFromTMDB(tmdb_id);

    if (insertedMovie.status >= 400) {
      // TMDb ID invalid or insertion failed
      return {
        msg: insertedMovie.msg,
        data: null,
        status: insertedMovie.status,
      };
    }

    // movie inserted and movie returned
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
