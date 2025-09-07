import Title from "../misc/Title";
import AppToaster from "../misc/Toaster";
import LargePoster from "../poster/LargePoster";
import { showToast } from "../../lib/showToast";
import LoadingList from "../loading/LoadingList";

import type { Movie } from "../../lib/types";

import { useEffect, useState } from "react";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]); // State to store popular movies
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch popular movies from backend
        const res = await axios.get(`${URL}movies/popular?page=1`);
        const json = res.data;

        // Take first 4 movies to display
        setMovies(json.data.results.slice(0, 4) || []);

        setLoading(false); // Done loading
      } catch (err: any) {
        // Show toast notification if fetch fails
        showToast("error", err.message || "Failed to fetch movies");
        setLoading(true); // Keep loading true (or could reset to false)
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="">
      {/* toaster for notifications */}
      <AppToaster />

      {/* section title with link to full list */}
      <Title title="Popular Movies" link="/movies/popular" />

      {/* loading skeleton while fetching */}
      {loading && (
        <LoadingList
          quantity={4}
          width="w-[230px]"
          height="h-[345px]"
          cols={4}
          rows={1}
        />
      )}

      {/* display popular movie posters when loaded */}
      <div className="grid grid-cols-4 gap-4 justify-items-end my-2">
        {!loading &&
          movies.map((movie, idx) => (
            <LargePoster
              key={idx}
              title={movie.title}
              image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              link={`/movie/${movie.id}`}
              release_date={movie.release_date}
            />
          ))}
      </div>
    </div>
  );
}
