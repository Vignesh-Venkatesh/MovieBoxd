import Title from "../misc/Title";
import AppToaster from "../misc/Toaster";
import SmallPoster from "../poster/SmallPoster";
import { showToast } from "../../lib/showToast";
import LoadingList from "../loading/LoadingList";

import type { Movie } from "../../lib/types";

import { useEffect, useState } from "react";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function NowPlaying() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}movies/now-playing?page=1`);
        console.log(res.data.data.results);
        setMovies(res.data.data.results.slice(0, 12) || []);
      } catch (err: any) {
        showToast("error", err.message || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="">
      {/* toaster */}
      <AppToaster />

      {/* title */}
      <Title title="Now Playing Movies" link="/movies/now-playing" />

      {/* loading */}
      {loading && (
        <LoadingList
          quantity={12}
          width="w-[70px]"
          height="h-[105px]"
          cols={12}
          rows={1}
        />
      )}

      {/* now-playing movies posters */}
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
