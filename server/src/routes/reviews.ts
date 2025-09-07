import { Hono } from "hono";
import { getLatestReviews } from "../db/reviews";

// initializing Hono router for review-related routes
export const reviewsRoutes = new Hono();

// GET /reviews/latest
reviewsRoutes.get("/latest", async (c) => {
  try {
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);

    // fetching latest reviews from database
    const result = await getLatestReviews(limit, page);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      500
    );
  }
});
