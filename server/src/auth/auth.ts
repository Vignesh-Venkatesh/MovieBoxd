import { Hono } from "hono";
import { supabase } from "../db/db";

const auth = new Hono();

/**
 * Auth Routes
 * -----------
 * Handles user signup, login, and authentication-protected endpoints.
 *
 *
 * Supabase Auth for creating / authenticating users
 * "profiles" table for storing custom profile info (display_name, bio, avatar_url)
 *
 * Routes:
 * - POST /signup - create user + profile
 * - POST /login - login user, return session
 * - GET /me - validate token, fetch user profile
 */

// ---------------------------
// Signup Route
// ---------------------------
auth.post("/signup", async (c) => {
  const { email, password, display_name, avatar_url, bio } = await c.req.json();

  // checking if display_name already exists (must be unique)
  const { data: existingProfile, error: checkError } = await supabase
    .from("profiles")
    .select("id")
    .eq("display_name", display_name)
    .maybeSingle();

  if (existingProfile) {
    return c.json({ msg: "Display name already taken", status: 400 }, 400);
  }

  if (checkError) {
    return c.json(
      { msg: "Error checking display name", error: checkError, status: 500 },
      500
    );
  }

  // creating user in Supabase Auth
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // auto confirm so no email confirmation is needed
  });

  if (error) {
    return c.json({ msg: "Signup failed", error, status: 400 }, 400);
  }

  // inserting user profile into "profiles" table (linked by auth user.id)
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.user?.id,
    display_name,
    avatar_url: avatar_url || null,
    bio: bio || null,
  });

  if (profileError) {
    // if profile creation fails, then we delete the auth user so no orphan record remains
    await supabase.auth.admin.deleteUser(user.user?.id!);

    return c.json(
      { msg: "Profile creation failed", error: profileError, status: 400 },
      400
    );
  }

  return c.json(
    { msg: "User created successfully", user: user.user, status: 201 },
    201
  );
});

// ---------------------------
// Login Route
// ---------------------------
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  // supabase handles email and password login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return c.json({ msg: "Login failed", error, status: 400 }, 400);
  }

  return c.json(
    {
      msg: "Login successful",
      session: data.session, // contains access + refresh tokens
      status: 200,
    },
    200
  );
});

// ---------------------------
// Protected Route: /me
// ---------------------------
auth.get("/me", async (c) => {
  // extracting JWT token from authorization header
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return c.json({ msg: "Unauthorized", status: 401 }, 401);
  }

  // validating token with Supabase
  const { data: authData, error: authError } = await supabase.auth.getUser(
    token
  );

  if (authError || !authData.user) {
    return c.json({ msg: "Invalid token", status: 401 }, 401);
  }

  const user = authData.user;

  // fetching profile info from "profiles" table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, display_name, created_at, avatar_url, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return c.json(
      { msg: "Profile fetch failed", error: profileError, status: 500 },
      500
    );
  }

  // merging Supabase Auth user data with custom profile
  return c.json(
    {
      status: 200,
      user: {
        id: user.id,
        email: user.email,
        ...profile, // attaching display_name, avatar_url, etc.
      },
    },
    200
  );
});

export default auth;
