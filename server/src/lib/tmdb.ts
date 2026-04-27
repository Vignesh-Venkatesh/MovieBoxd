import { supabase } from "../db/db";
import axios from "axios";

// TMDb API key from environment variables
const TMDB_API_KEY = Bun.env.TMDB_API_KEY!;
// Base URL for TMDb API
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch search results from TMDb based on a movie query and page number
 * movie - The search query string (movie title)
 * page - The page number for pagination
 * returns Object with message, status, and TMDb search results
 */
export async function getSearchResults(movie: string, page: number) {
  try {
    // constructing the full URL for TMDb search API
    const URL: string = `${BASE_URL}/search/movie?query=${movie}`;

    // making GET request to TMDb API
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // authorization with TMDb API key
      },
      params: {
        language: "en-US", // setting language for results
        page, // pagination page
      },
    });

    // returning successful response with fetched data
    return {
      msg: `Search results fetched for ${movie}`,
      status: 200,
      data: data,
    };
  } catch (err: any) {
    // logging and return error if request fails
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

/**
 * Fetch the credits (cast and crew) of a particular movie from TMDb
 * tmdb_id - The TMDb ID of the movie
 * returns Object with message, status, and credits data
 */
export async function getMovieCredits(tmdb_id: string) {
  try {
    // constructing the TMDb API URL for fetching movie credits
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/credits`;

    // making GET request to TMDb API
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // authorization using TMDb API key
      },
      params: {
        language: "en-US", // specifying language for the results
      },
    });

    // returning successful response with credits data
    return { msg: "Credits of movie fetched", status: 200, data: data };
  } catch (err: any) {
    // logging and handle errors
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

/**
 * Fetch recommended movies based on a particular movie from TMDb
 * tmdb_id - The TMDb ID of the movie
 * page - The page number for pagination (default 1)
 * returns Object with message, status, and recommendations data
 */
export async function getRecommendations(tmdb_id: string, page: number = 1) {
  try {
    // constructing the TMDb API URL for fetching movie recommendations
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/recommendations`;

    // making GET request to TMDb API
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // authorization using TMDb API key
      },
      params: {
        language: "en-US", // specifying language for the results
        page, // pagination
      },
    });

    // Optional: Insert every movie into local database (commented out)
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    // returning successful response with recommendation data
    return { msg: "Recommendations fetched", status: 200, data: data };
  } catch (err: any) {
    // logging and handle errors
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch movies similar to a given movie using TMDb API
export async function getSimilarMovies(tmdb_id: string, page: number = 1) {
  try {
    // constructing the TMDb API URL for similar movies
    const URL: string = `${BASE_URL}/movie/${tmdb_id}/similar`;

    // making a GET request to TMDb to fetch similar movies
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // TMDb API key in Bearer format
      },
      params: {
        language: "en-US", // specify language for movie data
        page, // pagination parameter
      },
    });

    // Optional: insert fetched movies into local database (commented out)
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    // returning the fetched similar movies with a success message
    return { msg: "Similar movies fetched", status: 200, data: data };
  } catch (err: any) {
    // logging any errors to the server console
    console.error("🛑 Error:", err.message || err);

    // returning a standardized error response
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch "Now Playing" movies from TMDb API
export async function getNowPlayingMovies(page: number = 1) {
  try {
    // constructing the TMDb API URL for now playing movies
    const URL: string = `${BASE_URL}/movie/now_playing`;

    // making a GET request to TMDb to fetch now playing movies
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // TMDb API key in Bearer format
      },
      params: {
        language: "en-US", // specifying language for movie data
        page, // pagination parameter
      },
    });

    // Optional: insert fetched movies into local database (commented out)
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    // returning the fetched now playing movies with a success message
    return { msg: "Now playing movies fetched", status: 200, data: data };
  } catch (err: any) {
    // logging any errors to the server console
    console.error("🛑 Error:", err.message || err);

    // returning a standardized error response
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch "Upcoming" movies from TMDb API
export async function getUpcomingMovies(page: number = 1) {
  try {
    // constructing the TMDb API URL for upcoming movies
    const URL: string = `${BASE_URL}/movie/upcoming`;

    // making a GET request to TMDb to fetch upcoming movies
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // TMDb API key in Bearer format
      },
      params: {
        language: "en-US", // specifying language for movie data
        page, // pagination parameter
      },
    });

    // Optional: insert fetched movies into local database (commented out)
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    // returning the fetched upcoming movies with a success message
    return { msg: "Upcoming movies fetched", status: 200, data: data };
  } catch (err: any) {
    // logging any errors to the server console
    console.error("🛑 Error:", err.message || err);

    // returning a standardized error response
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch "Popular" movies from TMDb API
export async function getPopularMovies(page: number = 1) {
  try {
    // constructing the TMDb API URL for popular movies
    const URL: string = `${BASE_URL}/movie/popular`;

    // making a GET request to TMDb to fetch popular movies
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // TMDb API key in Bearer format
      },
      params: {
        language: "en-US", // specifying language for movie data
        page, // pagination parameter
      },
    });

    // Optional: insert fetched movies into local database (commented out)
    // for (const movie of data.results) {
    //   await insertMovieFromTMDB(movie.id);
    // }

    // returning the fetched popular movies with a success message
    return { msg: "Popular movies fetched", status: 200, data: data };
  } catch (err: any) {
    // logging any errors to the server console
    console.error("🛑 Error:", err.message || err);

    // returning a standardized error response
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch a movie from TMDb by its ID and insert it into the Supabase database
export async function insertMovieFromTMDB(tmdb_id: string) {
  try {
    // constructing the TMDb API URL to fetch the specific movie by its TMDb ID
    const URL: string = `${BASE_URL}/movie/${tmdb_id}`;

    // making a GET request to TMDb to fetch movie details
    const { data: movie } = await axios.get(URL, {
      headers: {
        accept: "application/json", // expecting JSON response
        Authorization: `Bearer ${TMDB_API_KEY}`, // TMDb API key in Bearer format
      },
    });

    // if the movie is not found or the response is invalid, return a 404
    if (!movie || !movie.id) {
      return { msg: "Movie not found on TMDB", status: 404, data: null };
    }

    // inserting the movie into the Supabase "movies" table
    const { data, error } = await supabase
      .from("movies")
      .insert([
        {
          id: movie.id, // TMDb movie ID
          title: movie.title, // movie title
          overview: movie.overview || null, // overview or null if missing
          poster_path: movie.poster_path || null, // poster path or null
          backdrop_path: movie.backdrop_path || null, // backdrop path or null
          release_date: movie.release_date || null, // release date or null
          runtime: movie.runtime?.toString() || null, // runtime as string or null
        },
      ])
      .select(); // return the inserted row

    // if there’s a database error, return an error response
    if (error) {
      console.error(
        "🛑 Supabase insert error:",
        error.message,
        error.details,
        error.hint,
      );
      return {
        msg: "Failed to insert movie into database",
        status: 500,
        data: null,
      };
    }

    // returning success message with the inserted movie data
    return {
      msg: "Movie fetched from TMDB and inserted",
      status: 201,
      data: data?.[0],
    };
  } catch (err: any) {
    // logging unexpected errors and return a standardized server error response
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch a random movie from the database using a Supabase RPC
export async function getRandomMovie() {
  try {
    // calling the Supabase stored procedure "get_random_movie"
    const { data, error } = await supabase.rpc("get_random_movie");

    // handling database errors
    if (error) {
      return {
        msg: "Failed to get random movie from database",
        status: 500,
        data: null,
      };
    }

    // returning the first (random) movie from the result
    return {
      msg: `Random movie called "${data?.[0].title}" fetched`,
      status: 200,
      data: data?.[0],
    };
  } catch (err: any) {
    // logging unexpected errors and return a standardized server error response
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch detailed information about a particular person (actor, director, etc.) from TMDb
export async function getPersonInfo(person_id: string) {
  try {
    // constructing the TMDb API URL for the person endpoint
    const URL: string = `${BASE_URL}/person/${person_id}`;

    // making a GET request to TMDb for the person's info
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // accepting JSON responses
        Authorization: `Bearer ${TMDB_API_KEY}`, // using the TMDb API key
      },
      params: {
        language: "en-US", // requesting data in English
      },
    });

    // returning success response with the person's data
    return { msg: "Person info fetched", status: 200, data: data };
  } catch (err: any) {
    // logging unexpected errors and return a standardized error response
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}

// function to fetch the movie credits of a particular person (actor, director, etc.) from TMDb
export async function getPersonCredits(person_id: string) {
  try {
    // construct the TMDb API URL for the person's movie credits endpoint
    const URL: string = `${BASE_URL}/person/${person_id}/movie_credits`;

    // making a GET request to TMDb for the person's movie credits
    const { data } = await axios.get(URL, {
      headers: {
        accept: "application/json", // accepting JSON responses
        Authorization: `Bearer ${TMDB_API_KEY}`, // use the TMDb API key
      },
      params: {
        language: "en-US", // requesting data in English
      },
    });

    // if the API response contains the "cast" array, return it
    if (data["cast"]) {
      return { msg: "Person credits fetched", status: 200, data: data["cast"] };
    }

    // otherwise, return an empty array to indicate no credits found
    return { msg: "Person credits fetched", status: 200, data: [] };
  } catch (err: any) {
    // logging unexpected errors and return a standardized error response
    console.error("🛑 Error:", err.message || err);
    return { msg: "Unexpected server error", status: 500, data: null };
  }
}
