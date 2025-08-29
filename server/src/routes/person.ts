import { Hono } from "hono";
import { getPersonInfo, getPersonCredits } from "../lib/tmdb";

export const personsRoutes = new Hono();

// GET /person/:id/credits
personsRoutes.get("/:id/credits", async (c) => {
  try {
    const person_id = c.req.param("id"); // get person ID from URL

    const result = await getPersonCredits(person_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});

// GET /person/:id
personsRoutes.get("/:id", async (c) => {
  try {
    const person_id = c.req.param("id"); // get person ID from URL

    const result = await getPersonInfo(person_id);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
