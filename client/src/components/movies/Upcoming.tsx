import Title from "../misc/Title";
import AppToaster from "../misc/Toaster";
import SmallPoster from "../poster/SmallPoster";
import { showToast } from "../../lib/showToast";
import LoadingList from "../loading/LoadingList";

import type { Movie } from "../../lib/types";

import { useEffect, useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Upcoming() {
  const [movies, setMovies] = useState<Movie[]>([]); // State for upcoming movies
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch upcoming movies from backend
        const res = await axios.get(`${URL}movies/upcoming?page=1`);
        const json = res.data;

        // Take first 12 movies or empty array if none
        setMovies(json.data.results.slice(0, 12) || []);
      } catch (err: any) {
        showToast("error", err.message || "Failed to fetch movies");
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="">
      {/* toaster for notifications */}
      <AppToaster />

      {/* section title with link */}
      <Title title="Upcoming Movies" link="/movies/upcoming" />

      {/* show loading skeleton while fetching */}
      {loading && (
        <LoadingList
          quantity={12}
          width="w-[70px]"
          height="h-[105px]"
          cols={12}
          rows={1}
        />
      )}

      {/* display upcoming movie posters */}
      <div className="grid grid-cols-12 justify-items-end my-2">
        {!loading &&
          movies.map((movie, idx) => (
            <SmallPoster
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
