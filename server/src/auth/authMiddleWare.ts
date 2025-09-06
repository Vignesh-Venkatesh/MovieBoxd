import { supabase } from "../db/db";

/**
 * requireAuth middleware/helper
 * -----------------------------
 * Ensures the request is authenticated and fetches the associated user profile.
 *
 * Flow:
 * 1. Reads `Authorization: Bearer <token>` header
 * 2. Validates the token with Supabase Auth
 * 3. Fetches the matching row in `profiles` (custom user metadata)
 * 4. Returns a merged `fullUser` object (auth data + profile data)
 *
 * Returns:
 * - `c.json(...)` with appropriate error message if unauthorized/invalid
 * - A `fullUser` object if authentication is successful
 */
export async function requireAuth(c: any) {
  // extracting token from request header
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return c.json({ msg: "Unauthorized", status: 401 }, 401);
  }

  // verifying token with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.getUser(
    token
  );
  if (authError || !authData.user) {
    return c.json({ msg: "Invalid token", status: 401 }, 401);
  }

  const authUser = authData.user;

  // fetching the user profile (display_name, avatar_url, bio, created_at)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, bio, created_at")
    .eq("id", authUser.id)
    .maybeSingle();

  if (profileError || !profile) {
    return c.json({ msg: "Profile not found", status: 404 }, 404);
  }

  // merging Supabase Auth info with custom profile info
  const fullUser = {
    id: authUser.id,
    email: authUser.email,
    role: authUser.role,
    updated_at: authUser.updated_at,
    ...profile, // includes display_name, avatar_url, bio, created_at
  };

  return fullUser;
}
