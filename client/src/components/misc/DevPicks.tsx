import Title from "./Title";
import AppToaster from "../misc/Toaster";
import { showToast } from "../../lib/showToast";
import SmallPoster from "../poster/SmallPoster";
import LoadingList from "../loading/LoadingList";

import type { Movie } from "../../lib/types";

import { useEffect, useState } from "react";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function DevPicks() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevPicks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}dev-picks`);

        // extracting 'movies' field from each row
        const picks = res.data.data.map((item: any) => item.movies);
        setMovies(picks);
        setLoading(false);
      } catch (err: any) {
        showToast("error", err.message || "Failed to fetch dev picks");
        setLoading(true);
      }
    };

    fetchDevPicks();
  }, []);

  return (
    <div>
      {/* toaster */}
      <AppToaster />

      {/* title */}
      <Title title="dev picks" />

      {/* loading */}
      {loading && (
        <LoadingList
          quantity={6}
          width="w-[70px]"
          height="h-[105px]"
          cols={3}
          rows={2}
        />
      )}

      {/* dev-picks movies posters */}
      <div className="grid grid-cols-3 justify-items-end my-2">
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
