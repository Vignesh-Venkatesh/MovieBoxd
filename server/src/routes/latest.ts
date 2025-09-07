import { Hono } from "hono";
import { getLatestUsers } from "../db/users";

// initializing Hono router for fetching latest users
export const latestRoutes = new Hono();

/**
 * GET /latest/users
 * Fetches the most recently joined users with optional pagination.
 * Query parameters:
 *   - limit: number of users per page (default 10)
 *   - page: page number (default 1)
 */
latestRoutes.get("/users", async (c) => {
  try {
    // reading query parameters for pagination
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching latest users from database
    const result = await getLatestUsers(limit, page);

    // returning the result as JSON
    return c.json(result);
  } catch (err: any) {
    // logging unexpected errors and return generic server error
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json({ msg: "Unexpected server error" }, 500);
  }
});
