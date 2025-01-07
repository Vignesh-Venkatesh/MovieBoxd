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

// Get movie by ID route
router.get("/:id", (req, res) => {
  const movieId = req.params.id;

  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("error: " + err);
      res.json({ error: "Internal Server Error", status: 500 });
    });
});

// Get movie recommendations by ID route
router.get("/:id/recommendations", (req, res) => {
  const movieId = req.params.id;

  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("error: " + err);
      res.json({ error: "Internal Server Error", status: 500 });
    });
});

// Get movie cast details by ID route
router.get("/:id/cast", (req, res) => {
  const movieId = req.params.id;

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  fetch(url, options)
    .then((response) => response.json())
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
