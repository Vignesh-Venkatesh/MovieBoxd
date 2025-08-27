// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: Bun.env.DATABASE_URL,
// });

// // exporting the query variable to carry out query operations
// export const query = (text: string, parameters?: any[]) =>
//   pool.query(text, parameters);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
