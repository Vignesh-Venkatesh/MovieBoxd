import { Hono } from "hono";
import { getUserByUsername } from "../db/users";

export const usersRoutes = new Hono();

// GET /movies/:id
usersRoutes.get("/:username", async (c) => {
  try {
    const username = c.req.param("username"); // get username from URL

    const result = await getUserByUsername(username);

    return c.json(result);
  } catch (err: any) {
    console.error("🛑 Unexpected error:", err.message || err);
    return c.json(
      { msg: "Unexpected server error", status: 500, data: null },
      { status: 500 }
    );
  }
});
