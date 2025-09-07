// React and hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Helpers
import { showToast } from "../lib/showToast";
import axios from "axios";

// Components
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import LoadingList from "../components/loading/LoadingList";

// Types
import type { UserWatchlist } from "../lib/types";

// Backend URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserWatchlist() {
  // Get username from URL params
  const { username } = useParams();

  // State
  const [watchlist, setWatchlist] = useState<UserWatchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination limit
  const pageSize = 96; // 12 per row * 8 rows

  // Fetch user's watchlist
  useEffect(() => {
    const fetchWatchlisted = async () => {
      try {
        setLoading(true);
        document.title = `${username}'s Watchlist | MovieBoxd`;

        // Request watchlist from backend
        const res = await axios.get(
          `${URL}user/${username}/watchlist?page=${page}&limit=${pageSize}`
        );

        const { data, pagination } = res.data;

        if (data) {
          setWatchlist(data); // store watchlist movies
          setTotalPages(pagination.totalPages); // set total pages for pagination
        }
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch watchlist");
        showToast("error", "Failed to fetch watchlist");
        setLoading(false);
      }
    };

    fetchWatchlisted();
  }, [username, page]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />
        <div className="mt-10 space-y-2">
          <Title title={`${username}'s Watchlist`} />

          <LoadingList
            quantity={96}
            width="w-[70px]"
            height="h-[105px]"
            rows={8}
            cols={12}
          />
        </div>
      </div>
    );
  }

  // Render watchlist
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-4">
        <Title title={`${username}'s Watchlist`} />

        {watchlist.length > 0 ? (
          <>
            {/* Poster Grid */}
            <div className="grid grid-cols-12 gap-2">
              {watchlist.map((watchList) => (
                <SmallPoster
                  key={watchList.id}
                  title={watchList.movies.title}
                  image_url={`https://image.tmdb.org/t/p/w500/${watchList.movies.poster_path}`}
                  link={`/movie/${watchList.movies.id}`}
                  release_date={watchList.movies.release_date}
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
          // If no movies watchlisted
          <div className="h-[150px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No movies watchlisted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
