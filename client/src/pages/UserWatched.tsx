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
import type { UserWatched } from "../lib/types";

// Backend URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserWatched() {
  // Get username from URL
  const { username } = useParams();

  // State
  const [watched, setWatched] = useState<UserWatched[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination limit
  const pageSize = 96; // 12 columns * 8 rows

  // Fetch watched movies
  useEffect(() => {
    const fetchWatched = async () => {
      try {
        setLoading(true);
        document.title = `${username}'s Watched Movies | MovieBoxd`;

        // Fetch paginated watched movies from backend
        const res = await axios.get(
          `${URL}user/${username}/watched?page=${page}&limit=${pageSize}`
        );

        const { data, pagination } = res.data;

        if (data) {
          setWatched(data); // store movies
          setTotalPages(pagination.totalPages); // set total pages for pagination
        }
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch watched movies");
        showToast("error", "Failed to fetch watched movies");
        setLoading(false);
      }
    };

    fetchWatched();
  }, [username, page]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />
        <div className="mt-10 space-y-2">
          <Title title={`${username}'s Watched`} />

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

  // Render watched movies
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-4">
        <Title title={`${username}'s Watched`} />

        {watched.length > 0 ? (
          <>
            {/* Poster Grid */}
            <div className="grid grid-cols-12 gap-2">
              {watched.map((watch) => (
                <SmallPoster
                  key={watch.id}
                  title={watch.movies.title}
                  image_url={`https://image.tmdb.org/t/p/w500/${watch.movies.poster_path}`}
                  link={`/movie/${watch.movies.id}`}
                  release_date={watch.movies.release_date}
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
          // If no movies watched
          <div className="h-[150px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No movies watched yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
