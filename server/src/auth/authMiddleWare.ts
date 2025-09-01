import { supabase } from "../db/db";

export async function requireAuth(c: any) {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return c.json({ msg: "Unauthorized", status: 401 }, 401);
  }

  const { data: authData, error: authError } = await supabase.auth.getUser(
    token
  );
  if (authError || !authData.user) {
    return c.json({ msg: "Invalid token", status: 401 }, 401);
  }

  const authUser = authData.user;

  // fetching profile row to get display_name, avatar_url, bio, etc.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, bio, created_at")
    .eq("id", authUser.id)
    .maybeSingle();

  if (profileError || !profile) {
    return c.json({ msg: "Profile not found", status: 404 }, 404);
  }

  // merging auth user info and profile info
  const fullUser = {
    id: authUser.id,
    email: authUser.email,
    role: authUser.role,
    updated_at: authUser.updated_at,
    ...profile, // attaching display_name, avatar_url, bio
  };

  return fullUser;
}
