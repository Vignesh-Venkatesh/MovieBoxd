// Routes Imports
const MoviesRoute = require("./v1/movies");
const MovieRoute = require("./v1/movie");

// Setting express
const express = require("express");
const cors = require("cors"); // Import cors
const app = express(); // Initializing express app
app.use(express.json()); // Express JSON method

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

// Loading environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT; // Getting the PORT

// api version - v1

// Movies Route
app.use("/api/v1/movies", MoviesRoute);

// Movie Route
app.use("/api/v1/movie", MovieRoute);

app.get("/api/v1", (req, res) => {
  res.json({ message: "Welcome to MovieBoxd v1.0", status: 200 });
});

app.listen(PORT, () => {
  console.log(`MovieBoxd BackEnd Running at ${PORT}`);
});
