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
  tmdb_id: number;
  movie_name: string;
  quantity?: number;
  cols?: number;
  rows?: number;
};

export default function SimilarMovies({
  tmdb_id,
  movie_name,
  quantity = 4,
  cols = 2,
  rows = 2,
}: SimilarMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${URL}movies/${tmdb_id}/similar`);
        const json = res.data;
        setMovies(json.data.results.slice(0, quantity) || []);

        setLoading(false);
      } catch (err: any) {
        showToast("error", err.message || "Failed to fetch similar movies");
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [tmdb_id, quantity]);

  // not rendering whole section if no similar movies
  if (!loading && movies.length === 0) {
    return null;
  }

  // rendering if similar movies exist
  return (
    <div className="animate-fade-in">
      <AppToaster />

      <Title title={`Similar movies to '${movie_name}'`} />

      {loading ? (
        <LoadingList
          quantity={quantity}
          width="w-[70px]"
          height="h-[105px]"
          cols={cols}
          rows={rows}
        />
      ) : (
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
