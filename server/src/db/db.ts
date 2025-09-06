// -----------------------------
// Supabase Client Setup
// -----------------------------
//
// Previously, Postgres pool code was here (commented out, keeping it for future use), but we're now using Supabase.

import { createClient } from "@supabase/supabase-js";

// ensuring environment variables are set
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// creating Supabase client
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// import { Pool } from "pg";
// const pool = new Pool({
// connectionString: Bun.env.DATABASE_URL,
// });

// // exporting the query variable to carry out query operations
// export const query = (text: string, parameters?: any[]) =>
// pool.query(text, parameters);
