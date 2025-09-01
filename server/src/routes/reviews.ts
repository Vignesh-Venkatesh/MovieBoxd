import { Hono } from "hono";
import { getLatestReviews } from "../db/reviews";

export const reviewsRoutes = new Hono();

// GET /reviews/latest
reviewsRoutes.get("/latest", async (c) => {
  try {
    const limit = Number(c.req.query("limit") ?? 10);
    const page = Number(c.req.query("page") ?? 1);
    const result = await getLatestReviews(limit, page);
    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json({ msg: "Unexpected server error" }, 500);
  }
});
