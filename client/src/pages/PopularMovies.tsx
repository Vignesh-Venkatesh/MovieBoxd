import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import LoadingList from "../components/loading/LoadingList";
import { showToast } from "../lib/showToast";
import type { Movie } from "../lib/types";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 96; // 12 cols * 8 rows
  const apiPageSize = 20; // tmdb api returns 20 per page

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        document.title = `Popular Movies | MovieBoxd`;

        const pagesNeeded = Math.ceil(pageSize / apiPageSize);
        let allResults: Movie[] = [];
        let apiTotalPages = 0;

        for (let i = 0; i < pagesNeeded; i++) {
          const res = await axios.get(
            `${URL}movies/popular?page=${(page - 1) * pagesNeeded + i + 1}`
          );
          const { results, total_pages } = res.data.data;
          allResults = allResults.concat(results);
          if (i === 0) {
            apiTotalPages = total_pages;
          } // only need first response
        }

        setMovies(allResults.slice(0, pageSize));
        setTotalPages(Math.floor(apiTotalPages / pagesNeeded)); // dividing by pagesNeeded
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch popular movies");
        showToast("error", "Failed to fetch popular movies");
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />
        <div className="mt-10 space-y-2">
          <Title title="Popular Movies" />
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

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      <div className="mt-10 space-y-4">
        <Title title="Popular Movies" />

        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-2">
              {movies.map((movie, idx) => (
                <SmallPoster
                  key={idx}
                  title={movie.title}
                  image_url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  link={`/movie/${movie.id}`}
                  release_date={movie.release_date}
                />
              ))}
            </div>

            {/* Pagination */}
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
          <div className="h-[150px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No popular movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
