import { Pool } from "pg";

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL,
});

// exporting the query variable to carry out query operations
export const query = (text: string, parameters?: any[]) =>
  pool.query(text, parameters);
