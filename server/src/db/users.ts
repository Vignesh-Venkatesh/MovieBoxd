import { supabase } from "../db/db";

export async function getUserByUsername(username: string) {
  try {
    // check if movie already exists in supabase
    const { data: existing, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("display_name", username)
      .maybeSingle();

    if (existing === null) {
      // user does not exist
      return {
        msg: "User does not exist",
        data: null,
        status: 404,
      };
    }

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
        msg: "User fetched from database",
        data: existing,
        status: 200,
      };
    }
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting watched films of user
export async function getUserWatched(username: string, limit = 10, page = 1) {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError)
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    const offset = (page - 1) * limit;

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
        { count: "exact" }
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error)
      return {
        msg: "Error fetching watched movies",
        data: null,
        error,
        status: 500,
      };

    const totalPages = count ? Math.ceil(count / limit) : 1;

    return {
      msg: "Watched movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting favorited films of user
export async function getUserFavorited(username: string, limit = 10, page = 1) {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError)
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    const offset = (page - 1) * limit;

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
        { count: "exact" }
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error)
      return {
        msg: "Error fetching favorited movies",
        data: null,
        error,
        status: 500,
      };

    const totalPages = count ? Math.ceil(count / limit) : 1;

    return {
      msg: "Favorited movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting watchlisted films of user
export async function getUserWatchlisted(
  username: string,
  limit = 10,
  page = 1
) {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError)
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    const offset = (page - 1) * limit;

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
        { count: "exact" }
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error)
      return {
        msg: "Error fetching watchlisted movies",
        data: null,
        error,
        status: 500,
      };

    const totalPages = count ? Math.ceil(count / limit) : 1;

    return {
      msg: "Watchlisted movies fetched successfully",
      status: 200,
      data,
      pagination: { page, limit, totalCount: count ?? 0, totalPages },
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting reviewed films of user
export async function getUserReviews(username: string, limit = 10, page = 1) {
  try {
    // find user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError) {
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    const offset = (page - 1) * limit;

    // fetching reviews with count
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
        { count: "exact" } // getting total row count
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return { msg: "Error fetching reviews", data: null, error, status: 500 };
    }

    const totalPages = count ? Math.ceil(count / limit) : 1;

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
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

export async function getUserStats(username: string) {
  try {
    // looking up user_id using username from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (profileError) {
      // some database error
      return {
        msg: "Error querying database",
        data: null,
        error: profileError,
        status: 500,
      };
    }

    if (!profile) {
      return { msg: "User not found", status: 404, data: null };
    }

    const { data, error } = await supabase.rpc("get_user_stats", { username });

    if (error) {
      // some database error
      return {
        msg: "Error querying database",
        data: null,
        error: error,
        status: 500,
      };
    }

    return {
      msg: "User stats fetched successfully",
      status: 200,
      data: data?.[0] ?? { watched: 0, favorites: 0, watchlist: 0, reviews: 0 },
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

export async function getUserMovieStats(username: string, movieId: number) {
  // find profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("display_name", username)
    .maybeSingle();

  if (profileError) {
    return { msg: "Error querying profile", error: profileError, status: 500 };
  }

  if (!profile) {
    return { msg: "User not found", status: 404 };
  }

  const userId = profile.id;

  const [watchedRes, favoriteRes, watchlistRes, reviewRes] = await Promise.all([
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

  // destructure results
  const { data: watchedData, error: watchedError } = watchedRes;
  const { data: favoriteData, error: favoriteError } = favoriteRes;
  const { data: watchlistData, error: watchlistError } = watchlistRes;
  const { data: reviewData, error: reviewError } = reviewRes;

  if (watchedError || favoriteError || watchlistError || reviewError) {
    return {
      mgs: "Error querying movie status",
      error: watchedError || favoriteError || watchlistError || reviewError,
      status: 500,
    };
  }

  return {
    msg: "Movie status fetched successfully",
    status: 200,
    data: {
      watched: !!watchedData,
      favorited: !!favoriteData,
      watchlisted: !!watchlistData,
      review: reviewData || null,
    },
  };
}

// add user action (watched, favorited, watchlisted)
export async function addUserMovieAction(
  username: string,
  movieId: number,
  action: "watched" | "favorited" | "watchlisted"
) {
  const userResult = await getUserByUsername(username);

  if (!userResult || !userResult.data) {
    throw new Error("User not found");
  }

  const userId = userResult.data.id;

  let table = "";
  if (action === "watched") table = "watched";
  else if (action === "favorited") table = "favorites";
  else if (action === "watchlisted") table = "watchlist";
  else throw new Error("Invalid action");

  const { error } = await supabase
    .from(table)
    .insert({ user_id: userId, movie_id: movieId });

  if (error) throw new Error(error.message);
  return { msg: `${action} added`, status: 200 };
}

// remove user action relation
export async function removeUserMovieAction(
  username: string,
  movieId: number,
  action: "watched" | "favorited" | "watchlisted"
) {
  const userResult = await getUserByUsername(username);

  if (!userResult || !userResult.data) {
    throw new Error("User not found");
  }

  const userId = userResult.data.id;

  let table = "";
  if (action === "watched") table = "watched";
  else if (action === "favorited") table = "favorites";
  else if (action === "watchlisted") table = "watchlist";
  else throw new Error("Invalid action");

  const { error } = await supabase
    .from(table)
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw new Error(error.message);
  return { msg: `${action} removed`, status: 200 };
}

// Add or update a user review
export async function addUserReview(
  username: string,
  movieId: number,
  rating: number,
  review: string
) {
  const userResult = await getUserByUsername(username);
  if (!userResult || !userResult.data) throw new Error("User not found");
  const userId = userResult.data.id;

  // Check if review already exists
  const { data: existingReview, error: fetchError } = await supabase
    .from("reviews")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const updateData: { rating: number; review?: string | null } = { rating };

  // Only update review if provided
  if (review !== undefined) {
    updateData.review = review;
  }

  if (existingReview) {
    // Update existing review
    const { error: updateError } = await supabase
      .from("reviews")
      .update(updateData)
      .eq("id", existingReview.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
    return { msg: "Review updated", status: 200 };
  } else {
    // Insert new review
    const { error: insertError } = await supabase
      .from("reviews")
      .insert({ user_id: userId, movie_id: movieId, ...updateData });

    if (insertError) {
      throw new Error(insertError.message);
    }
    return { msg: "Review added", status: 200 };
  }
}

// Remove a user review
export async function removeUserReview(username: string, movieId: number) {
  const userResult = await getUserByUsername(username);
  if (!userResult || !userResult.data) throw new Error("User not found");
  const userId = userResult.data.id;

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) {
    throw new Error(error.message);
  }
  return { msg: "Review removed", status: 200 };
}
