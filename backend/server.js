// Routes Imports
const TMDBRoute = require("./v1/tmdb");

// Setting express
const express = require("express");
const app = express(); // Initializing express app
app.use(express.json()); // Express JSON method

// Loading environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT; // Getting the PORT

// api version - v1

// Movies Route
app.use("/api/v1/movies", TMDBRoute);

app.get("/api/v1", (req, res) => {
  res.json({ message: "Welcome to MovieBoxd v1.0", status: 200 });
});

app.listen(PORT, () => {
  console.log(`MovieBoxd BackEnd Running at ${PORT}`);
});
