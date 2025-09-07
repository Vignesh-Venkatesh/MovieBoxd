import { supabase } from "../db/db";

export async function getUserByUsername(username: string) {
  try {
    // querying profiles table by display_name
    const { data: existing, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("display_name", username)
      .maybeSingle();

    // handling database error first
    if (error) {
      return {
        msg: "Error querying database",
        data: null,
        error,
        status: 500,
      };
    }

    // handling user not found
    if (!existing) {
      return {
        msg: "User does not exist",
        data: null,
        status: 404,
      };
    }

    // returning user if found
    return {
      msg: "User fetched from database",
      data: existing,
      status: 200,
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * Fetch the watched movies of a given user by their username
 * username - The display_name of the user
 * limit - Number of movies per page
 * page - Current page number (1-indexed)
 */
export async function getUserWatched(username: string, limit = 10, page = 1) {
  try {
    // fetching the user's profile to get their ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    // handling profile query errors
    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    // handling case where user does not exist
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    // calculating offset for pagination
    const offset = (page - 1) * limit;

    // fetching watched movies with associated movie details
    const { data, error, count } = await supabase
      .from("watched")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
      `,
        { count: "exact" } // getting total number of rows for pagination
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }) // most recent first
      .range(offset, offset + limit - 1);

    // handling errors when fetching watched movies
    if (error) {
      return {
        msg: "Error fetching watched movies",
        data: null,
        error,
        status: 500,
      };
    }

    // compute total pages for pagination
    const totalPages = count ? Math.ceil(count / limit) : 1;

    // return successful response with data and pagination info
    return {
      msg: "Watched movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    // catch-all for unexpected runtime errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * Fetch the favorited movies of a given user by their username
 * username - The display_name of the user
 * limit - Number of movies per page
 * page - Current page number (1-indexed)
 */
export async function getUserFavorited(username: string, limit = 10, page = 1) {
  try {
    // fetching the user's profile to get their ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    // handling profile query errors
    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    // handling case where user does not exist
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    // calculating offset for pagination
    const offset = (page - 1) * limit;

    // fetching favorited movies with associated movie details
    const { data, error, count } = await supabase
      .from("favorites")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
      `,
        { count: "exact" } // getting total row count for pagination
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }) // most recent first
      .range(offset, offset + limit - 1);

    // handling errors when fetching favorited movies
    if (error) {
      return {
        msg: "Error fetching favorited movies",
        data: null,
        error,
        status: 500,
      };
    }

    // computing total pages for pagination
    const totalPages = count ? Math.ceil(count / limit) : 1;

    // returning successful response with data and pagination info
    return {
      msg: "Favorited movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    // catch-all for unexpected runtime errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * Fetch the watchlisted movies of a given user by their username
 * username - The display_name of the user
 * limit - Number of movies per page
 * page - Current page number (1-indexed)
 */
export async function getUserWatchlisted(
  username: string,
  limit = 10,
  page = 1
) {
  try {
    // fetching the user's profile to get their ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    // handling profile query errors
    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    // handling case where user does not exist
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    // calculating offset for pagination
    const offset = (page - 1) * limit;

    // fetching watchlisted movies with associated movie details
    const { data, error, count } = await supabase
      .from("watchlist")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
      `,
        { count: "exact" } // getting total row count for pagination
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }) // most recent first
      .range(offset, offset + limit - 1);

    // handling errors when fetching watchlisted movies
    if (error) {
      return {
        msg: "Error fetching watchlisted movies",
        data: null,
        error,
        status: 500,
      };
    }

    // computing total pages for pagination
    const totalPages = count ? Math.ceil(count / limit) : 1;

    // returning successful response with data and pagination info
    return {
      msg: "Watchlisted movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    // catch-all for unexpected runtime errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * Fetch the reviews of a given user by their username
 * username - The display_name of the user
 * limit - Number of reviews per page
 * page - Current page number (1-indexed)
 */
export async function getUserReviews(username: string, limit = 10, page = 1) {
  try {
    // fetching the user's profile to get their ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    // handling errors when querying profile
    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    // handling case where user does not exist
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    // calculating offset for pagination
    const offset = (page - 1) * limit;

    // fetching user reviews along with associated movie details
    const { data, error, count } = await supabase
      .from("reviews")
      .select(
        `
        id,
        user_id,
        movie_id,
        review,
        rating,
        created_at,
        movies ( id, title, poster_path, release_date )
      `,
        { count: "exact" } // including total row count for pagination
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }) // most recent first
      .range(offset, offset + limit - 1);

    // handling errors when fetching reviews
    if (error) {
      return {
        msg: "Error fetching reviews",
        data: null,
        error,
        status: 500,
      };
    }

    // computing total pages for pagination
    const totalPages = count ? Math.ceil(count / limit) : 1;

    // returning successful response with data and pagination info
    return {
      msg: "User reviews fetched successfully",
      status: 200,
      data,
      pagination: {
        page,
        limit,
        totalCount: count ?? 0,
        totalPages,
      },
    };
  } catch (err: any) {
    // catch-all for unexpected runtime errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

/**
 * Fetch aggregated stats for a given user
 * username - The display_name of the user
 */
export async function getUserStats(username: string) {
  try {
    // fetching user profile to get user ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    // handling errors while querying profile
    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    // handling case when user does not exist
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    // calling the Supabase RPC (remote procedure) to get user stats
    const { data, error } = await supabase.rpc("get_user_stats", { username });

    // handling errors from the RPC call
    if (error) {
      return {
        msg: "Error querying database",
        data: null,
        error,
        status: 500,
      };
    }

    // returning successful response with stats
    return {
      msg: "User stats fetched successfully",
      status: 200,
      // ensuring that if data is empty, defaults are returned
      data: data?.[0] ?? { watched: 0, favorites: 0, watchlist: 0, reviews: 0 },
    };
  } catch (err: any) {
    // catch-all for unexpected errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

export async function getUserMovieStats(username: string, movieId: number) {
  try {
    // finding user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError) {
      return {
        msg: "Error querying profile",
        error: profileError,
        status: 500,
      };
    }

    if (!profile) {
      return { msg: "User not found", status: 404 };
    }

    const userId = profile.id;

    // fetching movie actions in parallel
    const [watchedRes, favoriteRes, watchlistRes, reviewRes] =
      await Promise.all([
        supabase
          .from("watched")
          .select("id")
          .eq("user_id", userId)
          .eq("movie_id", movieId)
          .maybeSingle(),
        supabase
          .from("favorites")
          .select("id")
          .eq("user_id", userId)
          .eq("movie_id", movieId)
          .maybeSingle(),
        supabase
          .from("watchlist")
          .select("id")
          .eq("user_id", userId)
          .eq("movie_id", movieId)
          .maybeSingle(),
        supabase
          .from("reviews")
          .select("id, rating, review, created_at")
          .eq("user_id", userId)
          .eq("movie_id", movieId)
          .maybeSingle(),
      ]);

    // destructuring results
    const { data: watchedData, error: watchedError } = watchedRes;
    const { data: favoriteData, error: favoriteError } = favoriteRes;
    const { data: watchlistData, error: watchlistError } = watchlistRes;
    const { data: reviewData, error: reviewError } = reviewRes;

    // handling query errors
    if (watchedError || favoriteError || watchlistError || reviewError) {
      return {
        msg: "Error querying movie status",
        error: watchedError || favoriteError || watchlistError || reviewError,
        status: 500,
      };
    }

    // returning structured response
    return {
      msg: "Movie status fetched successfully",
      status: 200,
      data: {
        watched: watchedData !== null,
        favorited: favoriteData !== null,
        watchlisted: watchlistData !== null,
        review: reviewData || null,
      },
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

export async function addUserMovieAction(
  username: string,
  movieId: number,
  action: "watched" | "favorited" | "watchlisted"
) {
  try {
    // getting user
    const userResult = await getUserByUsername(username);
    if (!userResult || !userResult.data) {
      return { msg: "User not found", status: 404 };
    }
    const userId = userResult.data.id;

    // determining table
    const tableMap: Record<typeof action, string> = {
      watched: "watched",
      favorited: "favorites",
      watchlisted: "watchlist",
    };
    const table = tableMap[action];
    if (!table) {
      return { msg: "Invalid action", status: 400 };
    }

    // inserting action
    const { error } = await supabase
      .from(table)
      .insert({ user_id: userId, movie_id: movieId });
    if (error) {
      return { msg: error.message, status: 500 };
    }

    return { msg: `${action} added`, status: 200 };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", status: 500 };
  }
}
export async function removeUserMovieAction(
  username: string,
  movieId: number,
  action: "watched" | "favorited" | "watchlisted"
) {
  try {
    // getting user
    const userResult = await getUserByUsername(username);
    if (!userResult || !userResult.data) {
      return { msg: "User not found", status: 404 };
    }
    const userId = userResult.data.id;

    // determining table
    const tableMap: Record<typeof action, string> = {
      watched: "watched",
      favorited: "favorites",
      watchlisted: "watchlist",
    };
    const table = tableMap[action];
    if (!table) {
      return { msg: "Invalid action", status: 400 };
    }

    // deleting action
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) {
      return { msg: error.message, status: 500 };
    }

    return { msg: `${action} removed`, status: 200 };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", status: 500 };
  }
}

export async function addUserReview(
  username: string,
  movieId: number,
  rating: number,
  review?: string
) {
  try {
    // getting user
    const userResult = await getUserByUsername(username);
    if (!userResult || !userResult.data) {
      return { msg: "User not found", status: 404 };
    }
    const userId = userResult.data.id;

    // checking if review exists
    const { data: existingReview, error: fetchError } = await supabase
      .from("reviews")
      .select("id")
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .maybeSingle();

    if (fetchError) {
      return { msg: fetchError.message, status: 500 };
    }

    const reviewData: { rating: number; review?: string | null } = { rating };
    if (review !== undefined) reviewData.review = review;

    if (existingReview) {
      // updating existing review
      const { error: updateError } = await supabase
        .from("reviews")
        .update(reviewData)
        .eq("id", existingReview.id);

      if (updateError) return { msg: updateError.message, status: 500 };

      return { msg: "Review updated", status: 200 };
    } else {
      // inserting new review
      const { error: insertError } = await supabase
        .from("reviews")
        .insert({ user_id: userId, movie_id: movieId, ...reviewData });

      if (insertError) return { msg: insertError.message, status: 500 };

      return { msg: "Review added", status: 200 };
    }
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", status: 500 };
  }
}

// removing a user review
export async function removeUserReview(username: string, movieId: number) {
  try {
    // getting user
    const userResult = await getUserByUsername(username);
    if (!userResult || !userResult.data) {
      return { msg: "User not found", status: 404 };
    }
    const userId = userResult.data.id;

    // deleting review
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) return { msg: error.message, status: 500 };

    return { msg: "Review removed", status: 200 };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", status: 500 };
  }
}

export async function getLatestUsers(limit = 10, page = 1) {
  try {
    // calculating the offset for pagination based on page and limit
    const offset = (page - 1) * limit;

    // querying the profiles table, select user info, and get exact count for pagination
    const {
      data: users,
      error,
      count,
    } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1); // fetching the correct range of rows for this page

    // handling any database error
    if (error) {
      return {
        msg: "Error querying database",
        data: null,
        error,
        status: 500,
      };
    }

    // calculating total number of pages
    const totalPages = count ? Math.ceil(count / limit) : 1;

    // returning fetched users along with pagination info
    return {
      msg: "Latest users fetched successfully",
      status: 200,
      data: users,
      pagination: {
        page, // current page
        limit, // number of items per page
        totalCount: count ?? 0, // total number of users
        totalPages, // total pages
      },
    };
  } catch (err: any) {
    // handling unexpected errors
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}
