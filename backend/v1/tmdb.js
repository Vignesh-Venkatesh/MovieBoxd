// Setting up express and express router
const express = require("express");
const router = express.Router();

// Fetching TMDB API key
const dotenv = require("dotenv");
dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// TMDB header options
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_API_KEY,
  },
};

// Now Showing route
router.get("/now-showing", (req, res) => {
  const region = req.query.region || "US";
  const page = req.query.page || 1;

  const url = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&region=${region}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("error: " + err);
      res.json({ error: "Internal Server Error", status: 500 });
    });
});

// Exporting router
module.exports = router;
