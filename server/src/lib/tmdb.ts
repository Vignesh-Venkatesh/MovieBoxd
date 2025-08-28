import { supabase } from "../db/db";
import axios from "axios";

const TMDB_API_KEY = Bun.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

// getting search results based on query param (movie) passed
export async function getSearchResults(movie: string, page: number) {
  try {
    // fetching credits of movie from TMDb
    const URL: string = `${BASE_URL}/search/movie?query=${movie}`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    return {
      msg: `Search results fetched for ${movie}`,
      status: 200,
      data: data,
    };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting the credits of a particular movie
export async function getMovieCredits(tmdb_id: string) {
  try {
    // fetching credits of movie from TMDb
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/credits`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
      },
    });

    return { msg: "Credits of movie fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting recommendations based on a particular movie
export async function getRecommendations(tmdb_id: string, page: number = 1) {
  try {
    // fetching recommendations movies from TMDb
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/recommendations`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    // // just in case, inserting every movie into table
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    return { msg: "Recommendations fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting similar movies based on a movie provided by the user
export async function getSimilarMovies(tmdb_id: string, page: number = 1) {
  try {
    // fetching similar movies from TMDb
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/similar`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    // // just in case, inserting every movie into table
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    return { msg: "Similar movies fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting now playing movies
export async function getNowPlayingMovies(page: number = 1) {
  try {
    // fetching now playing movies from TMDb
    const URL: string = `${BASE_URL}/movie/now_playing`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    // // just in case, inserting every movie into table
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    return { msg: "Now playing movies fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting upcoming movies
export async function getUpcomingMovies(page: number = 1) {
  try {
    // fetching upcoming movies from TMDb
    const URL: string = `${BASE_URL}/movie/upcoming`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    // // just in case, inserting every movie into table
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    return { msg: "Upcoming movies fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// getting popular movies
export async function getPopularMovies(page: number = 1) {
  try {
    // fetching popular movies from TMDb
    const URL: string = `${BASE_URL}/movie/popular`;

    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        language: "en-US",
        page,
      },
    });

    // // just in case, inserting every movie into table
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    return { msg: "Popular movies fetched", status: 200, data: data };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// inserting movies into the database
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

// getting random movie from the database
export async function getRandomMovie() {
  try {
    const { data, error } = await supabase.rpc("get_random_movie");

    if (error) {
      return {
        msg: "Failed to get random movie from database",
        status: 500,
        data: null,
      };
    }

    return {
      msg: `Random movie called "${data?.[0].title}" fetched`,
      status: 200,
      data: data?.[0],
    };
  } catch (err: any) {
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}
