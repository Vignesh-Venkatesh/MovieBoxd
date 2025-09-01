import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { showToast } from "../lib/showToast";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import type { UserWatchlist } from "../lib/types";
import LoadingList from "../components/loading/LoadingList";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserWatchlist() {
  const { username } = useParams();

  const [watchlist, setWatchlist] = useState<UserWatchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 96; // 12 per row * 8 rows

  useEffect(() => {
    const fetchWatchlisted = async () => {
      try {
        setLoading(true);
        document.title = `${username}'s Favorite Movies | MovieBoxd`;

        const res = await axios.get(
          `${URL}user/${username}/watchlist?page=${page}&limit=${pageSize}`
        );

        const { data, pagination } = res.data;

        if (data) {
          setWatchlist(data);
          setTotalPages(pagination.totalPages);
        }
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch favorited movies");
        showToast("error", "Failed to fetch favorited movies");
        setLoading(false);
      }
    };

    fetchWatchlisted();
  }, [username, page]);

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
            <p>No movies watchlisted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
