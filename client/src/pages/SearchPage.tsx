import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import type { Movie } from "../lib/types";
import { showToast } from "../lib/showToast";
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import LoadingList from "../components/loading/LoadingList";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}movies/search`, {
          params: { movie: query, page },
        });

        if (res.data.status === 200) {
          setResults(res.data.data.results);
          setTotalPages(res.data.data.total_pages);

          if (res.data.data.results.length === 0) {
            showToast("normal", `No results found for "${query}"`);
          }
        } else {
          setResults([]);
          showToast("error", res.data.msg || "Search failed");
        }
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        showToast("error", "Unexpected server error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: String(newPage) });
  };

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      <div className="h-10"></div>
      <Title title={`Search results for ${query}`} />

      {/* loader */}
      {loading && (
        <div className="mt-2 flex flex-col gap-5">
          <LoadingList
            quantity={8}
            cols={1}
            rows={8}
            width="w-full"
            height="h-30"
          />
        </div>
      )}

      {/* search results */}
      {!loading && results.length === 0 && (
        <p className="text-gray-500">No movies found.</p>
      )}

      <div className="mt-2 flex flex-col gap-5">
        {results.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="flex bg-base-200 p-4 rounded shadow-xl border-2 border-transparent hover:border-green-500 hover:bg-base-300 transition-colors duration-300">
              <SmallPoster
                image_url={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                title={movie.title}
                link={`/movie/${movie.id}`}
                release_date={movie.release_date}
              />

              <div className="p-2 flex flex-col gap-2">
                {/* movie title and release date */}
                <h1 className="text-sm font-bold truncate">
                  {movie.title}{" "}
                  <span className="text-xs text-gray-400">
                    {movie.release_date?.slice(0, 4) || ""}
                  </span>
                </h1>

                {/* movie overview */}
                {movie.overview ? (
                  <h1 className="opacity-80 text-sm line-clamp-4">
                    {movie.overview}
                  </h1>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
