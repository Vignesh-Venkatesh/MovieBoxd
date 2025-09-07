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
  const [movies, setMovies] = useState<Movie[]>([]); // store fetched dev picks
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchDevPicks = async () => {
      try {
        setLoading(true); // start loading
        const res = await axios.get(`${URL}dev-picks`);

        // extract 'movies' field from each returned item
        const picks = res.data.data.map((item: any) => item.movies);
        setMovies(picks); // store dev picks
        setLoading(false); // finished loading
      } catch (err: any) {
        // show error toast and keep loading true
        showToast("error", err.message || "Failed to fetch dev picks");
        setLoading(true);
      }
    };

    fetchDevPicks(); // fetch dev picks on mount
  }, []);

  return (
    <div>
      {/* Toaster for notifications */}
      <AppToaster />

      {/* Section title */}
      <Title title="dev picks" />

      {/* Loading skeleton if data is fetching */}
      {loading && (
        <LoadingList
          quantity={6} // show 6 placeholder posters
          width="w-[70px]"
          height="h-[105px]"
          cols={3}
          rows={2}
        />
      )}

      {/* Display dev picks when loading is done */}
      <div className="grid grid-cols-3 justify-items-end my-2">
        {!loading &&
          movies.map((movie, idx) => (
            <SmallPoster
              key={idx}
              title={movie.title} // movie title
              image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // poster image
              link={`/movie/${movie.id}`} // link to movie page
              release_date={movie.release_date} // release date
            />
          ))}
      </div>
    </div>
  );
}
