import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import LoadingList from "../components/loading/LoadingList";
import { showToast } from "../lib/showToast";
import type { Movie } from "../lib/types";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function NowPlaying() {
  // State to store fetched movies
  const [movies, setMovies] = useState<Movie[]>([]);
  // Loading state while fetching data
  const [loading, setLoading] = useState(true);
  // Current page for pagination
  const [page, setPage] = useState(1);
  // Total pages available for pagination
  const [totalPages, setTotalPages] = useState(1);

  // Number of movies to display per page in UI
  const pageSize = 96; // 12 columns x 8 rows
  // Number of movies returned per API call
  const apiPageSize = 20; // TMDb API returns 20 per page

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setLoading(true);
        document.title = `Now Playing | MovieBoxd`;

        // Calculate how many API calls are needed to fill the page
        const pagesNeeded = Math.ceil(pageSize / apiPageSize);
        let allResults: Movie[] = [];
        let apiTotalPages = 0;

        // Loop through API pages and aggregate results
        for (let i = 0; i < pagesNeeded; i++) {
          const res = await axios.get(
            `${URL}movies/now-playing?page=${(page - 1) * pagesNeeded + i + 1}`
          );
          const { results, total_pages } = res.data.data;
          allResults = allResults.concat(results);

          if (i === 0) apiTotalPages = total_pages; // save total pages from first response
        }

        // Slice results to match pageSize and set movies
        setMovies(allResults.slice(0, pageSize));
        setTotalPages(Math.floor(apiTotalPages / pagesNeeded));
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch now-playing movies");
        showToast("error", "Failed to fetch now-playing movies");
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, [page]); // refetch when page changes

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />
        <div className="mt-10 space-y-2">
          <Title title="Now Playing" />
          {/* Skeleton loading placeholders */}
          <LoadingList
            quantity={pageSize}
            width="w-[70px]"
            height="h-[105px]"
            rows={8}
            cols={12}
          />
        </div>
      </div>
    );
  }

  // Main UI after data is loaded
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      <div className="mt-10 space-y-4">
        <Title title="Now Playing" />

        {movies.length > 0 ? (
          <>
            {/* Grid of movie posters */}
            <div className="grid grid-cols-12 gap-2">
              {movies.map((movie) => (
                <SmallPoster
                  key={movie.id}
                  title={movie.title}
                  image_url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  link={`/movie/${movie.id}`}
                  release_date={movie.release_date}
                />
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn btn-sm"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          // Fallback if no movies are returned
          <div className="h-[150px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No now-playing movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
