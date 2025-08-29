import { Hono } from "hono";
import { supabase } from "../db/db";

const auth = new Hono();

// signup route
auth.post("/signup", async (c) => {
  const { email, password, display_name, avatar_url, bio } = await c.req.json();

  // checking if display_name already exists
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

  // creating user in supabase auth
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // auto confirm so no email confirmation needed
  });

  if (error) {
    return c.json({ msg: "Signup failed", error, status: 400 }, 400);
  }

  // inserting profile into profiles table
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.user?.id,
    display_name,
    avatar_url: avatar_url || null,
    bio: bio || null,
  });

  if (profileError) {
    // cleanup = deleting the auth user so no orphan user remains
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

// login
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();

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
      session: data.session,
      status: 200,
    },
    200
  );
});

// protected route
auth.get("/me", async (c) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return c.json({ msg: "Unauthorized", status: 401 }, 401);
  }

  // verifying supabase user with token
  const { data: authData, error: authError } = await supabase.auth.getUser(
    token
  );

  if (authError || !authData.user) {
    return c.json({ msg: "Invalid token", status: 401 }, 401);
  }

  const user = authData.user;

  // fetching matching profile row from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, display_name, created_at, avatar_url, bio")
    .eq("id", user.id) // profiles.id is same as auth.user.id
    .maybeSingle();

  if (profileError) {
    return c.json(
      { msg: "Profile fetch failed", error: profileError, status: 500 },
      500
    );
  }

  // merging info
  return c.json(
    {
      status: 200,
      user: {
        id: user.id,
        email: user.email,
        ...profile, // attaching display_name, created_at, avatar_url, bio
      },
    },
    200
  );
});

export default auth;
