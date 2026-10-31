// -----------------------------
// Supabase Client Setup
// -----------------------------
//
// Previously, Postgres pool code was here (commented out, keeping it for future use), but we're now using Supabase.

import { createClient } from "@supabase/supabase-js";

// ensuring environment variables are set
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// creating Supabase client
// export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Privileged client for trusted backend operations.
// Never sign users in through this client.
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

// Create a separate client for each authentication request.
export const createAuthClient = () =>
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
});

// import { Pool } from "pg";
// const pool = new Pool({
// connectionString: Bun.env.DATABASE_URL,
// });

// // exporting the query variable to carry out query operations
// export const query = (text: string, parameters?: any[]) =>
// pool.query(text, parameters);
