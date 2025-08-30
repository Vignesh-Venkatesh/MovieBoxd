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
export async function getUserWatched(username: string) {
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

    // fetching watched movies joined with movie info
    const { data, error } = await supabase
      .from("watched")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
        .order('created_at', { ascending: false })
      `
      )
      .eq("user_id", profile.id);

    if (error) {
      return {
        msg: "Error fetching watched movies",
        data: null,
        error,
        status: 500,
      };
    }

    return {
      msg: "Watched movies fetched successfully",
      status: 200,
      data,
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting favorited films of user
export async function getUserFavorited(username: string) {
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

    // fetching favorited movies joined with movie info
    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
      `
      )
      .eq("user_id", profile.id);

    if (error) {
      return {
        msg: "Error fetching favorited movies",
        data: null,
        error,
        status: 500,
      };
    }

    return {
      msg: "Favorited movies fetched successfully",
      status: 200,
      data,
    };
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return { msg: "Unexpected server error", data: null, status: 500 };
  }
}

// getting watchlisted films of user
export async function getUserWatchlisted(username: string) {
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

    // fetching watchlisted movies joined with movie info
    const { data, error } = await supabase
      .from("watchlist")
      .select(
        `
        id,
        user_id,
        movie_id,
        created_at,
        movies ( id, title, poster_path, release_date )
      `
      )
      .eq("user_id", profile.id);

    if (error) {
      return {
        msg: "Error fetching watchlisted movies",
        data: null,
        error,
        status: 500,
      };
    }

    return {
      msg: "Watchlisted movies fetched successfully",
      status: 200,
      data,
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
