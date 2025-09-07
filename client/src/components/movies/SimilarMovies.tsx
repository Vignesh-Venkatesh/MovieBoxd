import Title from "../misc/Title";
import { useState, useEffect } from "react";
import AppToaster from "../misc/Toaster";
import { showToast } from "../../lib/showToast";
import LoadingList from "../loading/LoadingList";
import SmallPoster from "../poster/SmallPoster";

import type { Movie } from "../../lib/types";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

type SimilarMoviesProps = {
  tmdb_id: number; // TMDb movie ID to fetch similar movies for
  movie_name: string; // Current movie name to display in the section title
  quantity?: number; // Number of similar movies to show
  cols?: number; // Number of columns in grid layout
  rows?: number; // Number of rows in grid layout
};

export default function SimilarMovies({
  tmdb_id,
  movie_name,
  quantity = 4,
  cols = 2,
  rows = 2,
}: SimilarMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]); // State for fetched similar movies
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch similar movies from backend
        const res = await axios.get(`${URL}movies/${tmdb_id}/similar`);
        const json = res.data;

        // Slice to desired quantity
        setMovies(json.data.results.slice(0, quantity) || []);

        setLoading(false); // Done loading
      } catch (err: any) {
        // Show error toast if request fails
        showToast("error", err.message || "Failed to fetch similar movies");
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [tmdb_id, quantity]);

  // Don't render section if no similar movies found
  if (!loading && movies.length === 0) {
    return null;
  }

  // Render section with title and movies
  return (
    <div className="animate-fade-in">
      {/* toaster for notifications */}
      <AppToaster />

      {/* section title */}
      <Title title={`Similar movies to '${movie_name}'`} />

      {loading ? (
        // Show loading skeleton while fetching
        <LoadingList
          quantity={quantity}
          width="w-[70px]"
          height="h-[105px]"
          cols={cols}
          rows={rows}
        />
      ) : (
        // Display similar movies in a grid
        <div
          className={`grid grid-cols-${cols} grid-rows-${rows} justify-items-end my-2`}
        >
          {movies.map((movie) => (
            <SmallPoster
              key={movie.id}
              title={movie.title}
              image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              link={`/movie/${movie.id}`}
              release_date={movie.release_date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
