import { Hono } from "hono";
import { getPersonInfo, getPersonCredits } from "../lib/tmdb";

// initializing Hono router for person-related routes
export const personsRoutes = new Hono();

// GET /person/:id/credits
personsRoutes.get("/:id/credits", async (c) => {
  try {
    const person_id = c.req.param("id"); // getting person ID from URL

    // fetching person credits from TMDb
    const result = await getPersonCredits(person_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});

// GET /person/:id
personsRoutes.get("/:id", async (c) => {
  try {
    const person_id = c.req.param("id"); // getting person ID from URL

    // fetching person info from TMDb
    const result = await getPersonInfo(person_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});
