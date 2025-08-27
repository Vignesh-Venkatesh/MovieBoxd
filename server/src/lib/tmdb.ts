import { supabase } from "../db/db";
import axios from "axios";

const TMDB_API_KEY = Bun.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

export async function insertMovieFromTMDB(tmdb_id: string) {
  try {
    // fetching movie from TMDb
    const URL: string = `${BASE_URL}/movie/${tmdb_id}`;

    const { data: movie } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!movie || !movie.id) {
      return { msg: "Movie not found on TMDB", status: 404, data: null };
    }

    // inserting data in supabase
    const { data, error } = await supabase
      .from("movies")
      .insert([
        {
          id: movie.id,
          title: movie.title,
          overview: movie.overview || null,
          poster_path: movie.poster_path || null,
          backdrop_path: movie.backdrop_path || null,
          release_date: movie.release_date,
          runtime: movie.runtime?.toString() || null,
        },
      ])
      .select();

    if (error) {
      return {
        msg: "Failed to insert movie into database",
        status: 500,
        data: null,
      };
    }

    return {
      msg: "Movie fetched from TMDB and inserted",
      status: 201,
      data: data?.[0],
    };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}
