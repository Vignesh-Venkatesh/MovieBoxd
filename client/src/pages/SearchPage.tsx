// Import React hooks, routing, and other libraries
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom"; // for query params and links
import axios from "axios"; // for HTTP requests
import type { Movie } from "../lib/types"; // TypeScript type for Movie
import { showToast } from "../lib/showToast"; // To display notifications
import Navbar from "../components/Navbar"; // Navigation bar
import Title from "../components/misc/Title"; // Page title component
import SmallPoster from "../components/poster/SmallPoster"; // Movie poster component
import LoadingList from "../components/loading/LoadingList"; // Loader skeleton

// Backend API base URL from environment variables
const URL = import.meta.env.VITE_BACKEND_URL;

export default function SearchPage() {
  // Get query params from URL (?q=xxx&page=1)
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // search query
  const page = parseInt(searchParams.get("page") || "1"); // current page

  // State for loader, search results, and total pages
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch search results whenever query or page changes
  useEffect(() => {
    if (!query) return; // skip if no query

    const fetchMovies = async () => {
      setLoading(true); // show loader
      try {
        const res = await axios.get(`${URL}movies/search`, {
          params: { movie: query, page }, // send query and page
        });

        if (res.data.status === 200) {
          // Success
          setResults(res.data.data.results); // store movies
          setTotalPages(res.data.data.total_pages); // store total pages

          // Show notification if no results
          if (res.data.data.results.length === 0) {
            showToast("normal", `No results found for "${query}"`);
          }
        } else {
          // Error from backend
          setResults([]);
          showToast("error", res.data.msg || "Search failed");
        }
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        showToast("error", "Unexpected server error"); // network/server error
      } finally {
        setLoading(false); // hide loader
      }
    };

    fetchMovies();
  }, [query, page]); // run when query or page changes

  // Handle page navigation (Prev / Next buttons)
  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: String(newPage) }); // update URL params
  };

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar /> {/* Top navigation bar */}
      <div className="h-10"></div>
      <Title title={`Search results for ${query}`} /> {/* Page title */}
      {/* Loader skeleton while fetching */}
      {loading && (
        <div className="mt-2 flex flex-col gap-5">
          <LoadingList
            quantity={8} // number of items in loader
            cols={1}
            rows={8}
            width="w-full"
            height="h-30"
          />
        </div>
      )}
      {/* Message when no results found */}
      {!loading && results.length === 0 && (
        <p className="text-gray-500">No movies found.</p>
      )}
      {/* Display search results */}
      <div className="mt-2 flex flex-col gap-5">
        {results.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="flex bg-base-200 p-4 rounded shadow-xl border-2 border-transparent hover:border-green-500 hover:bg-base-300 transition-colors duration-300">
              {/* Movie poster */}
              <SmallPoster
                image_url={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                title={movie.title}
                link={`/movie/${movie.id}`}
                release_date={movie.release_date}
              />

              {/* Movie info */}
              <div className="p-2 flex flex-col gap-2">
                {/* Title with release year */}
                <h1 className="text-sm font-bold truncate">
                  {movie.title}{" "}
                  <span className="text-xs text-gray-400">
                    {movie.release_date?.slice(0, 4) || ""}
                  </span>
                </h1>

                {/* Movie overview */}
                {movie.overview ? (
                  <h1 className="opacity-80 text-sm line-clamp-4">
                    {movie.overview}
                  </h1>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="btn btn-sm"
            disabled={page === 1} // disable Prev on first page
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page === totalPages} // disable Next on last page
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
