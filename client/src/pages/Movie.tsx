import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";
import MovieLoading from "../components/loading/MovieLoading";
import MovieInfo from "../components/movies/MovieInfo";

import type { Movie, Cast } from "../lib/types";
import axios from "axios";

// Backend URL from environment variables
const URL = import.meta.env.VITE_BACKEND_URL;

export default function Movie() {
  // Get movie ID from the route parameters
  const { id } = useParams();

  // Local state for movie info and cast
  const [movie, setMovie] = useState<Movie>();
  const [cast, setCast] = useState<Cast[] | null>([]);

  // Loading states for movie and cast separately
  const [movieLoading, setMovieLoading] = useState(true);
  const [castLoading, setCastLoading] = useState(true);
  const loading = movieLoading || castLoading; // overall loading state

  const navigate = useNavigate(); // used for redirecting if movie not found

  useEffect(() => {
    // Function to fetch movie details from backend
    const fetchMovieInfo = async () => {
      try {
        setMovieLoading(true);

        const res = await axios.get(`${URL}movies/${id}`);
        const json = res.data;

        if (json.data) {
          setMovie(json.data);
          // Update document title to movie title
          document.title = `${json.data.title} | MovieBoxd`;
        } else {
          // Navigate to 404 page if movie not found
          navigate("*");
        }
        setMovieLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch movie info");
        showToast("error", "Failed to fetch movie info");
        setMovieLoading(true);
      }
    };

    // Function to fetch movie cast info from backend
    const fetchMovieCastInfo = async () => {
      try {
        setCastLoading(true);

        const res = await axios.get(`${URL}movies/${id}/credits`);
        const json = res.data;

        if (json.data) {
          setCast(json.data.cast); // store cast array
        }
        setCastLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch cast info");
        showToast("error", "Failed to fetch cast info");
        setCastLoading(true);
      }
    };

    // Fetch both movie info and cast info when component mounts or ID changes
    fetchMovieInfo();
    fetchMovieCastInfo();
  }, [id]);

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      {/* Navbar component */}
      <Navbar />

      {/* Toast notifications */}
      <AppToaster />

      {/* Conditional rendering */}
      {loading ? (
        // Show loading skeleton while fetching
        <MovieLoading key={id} />
      ) : movie ? (
        // Show movie info and cast when loaded
        <MovieInfo key={id} movie={movie} cast={cast} />
      ) : null}
    </div>
  );
}
