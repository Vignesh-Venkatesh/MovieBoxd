import { Client } from "pg";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  await client.connect(); // connecting to the database

  // locating the migrations folder and sql files
  const migrationsDir = path.join(process.cwd(), "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  // iterating through each sql file and executing the query
  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const sql = readFileSync(path.join(migrationsDir, file), "utf8");
    await client.query(sql);
  }

  await client.end();
  console.log("✅ All migrations applied.");
}

// if migration fails
runMigrations().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
