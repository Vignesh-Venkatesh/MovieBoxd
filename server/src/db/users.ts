import { supabase } from "../db/db";

export async function getUserByUsername(username: string) {
  try {
    // check if movie already exists in supabase
    const { data: existing, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("display_name", username)
      .maybeSingle();

    console.log(error, existing);

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
