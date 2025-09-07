// React and hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Helpers and API
import { showToast } from "../lib/showToast";
import axios from "axios";

// Components
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import SmallPoster from "../components/poster/SmallPoster";
import LoadingList from "../components/loading/LoadingList";

// Types
import type { UserFavorited } from "../lib/types";

// Backend API URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserFavorited() {
  // Get username from URL
  const { username } = useParams();

  // State for favorited movies and loading
  const [favorited, setFavorited] = useState<UserFavorited[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page for pagination
  const [totalPages, setTotalPages] = useState(1); // total pages from backend

  const pageSize = 96; // 12 columns * 8 rows per page

  useEffect(() => {
    // Fetch user's favorited movies from API
    const fetchFavorited = async () => {
      try {
        setLoading(true);
        document.title = `${username}'s Favorite Movies | MovieBoxd`;

        // API request with pagination
        const res = await axios.get(
          `${URL}user/${username}/favorites?page=${page}&limit=${pageSize}`
        );

        const { data, pagination } = res.data;

        if (data) {
          setFavorited(data); // set movie data
          setTotalPages(pagination.totalPages); // set total pages
        }
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch favorited movies");
        showToast("error", "Failed to fetch favorited movies");
        setLoading(false);
      }
    };

    fetchFavorited();
  }, [username, page]); // refetch when username or page changes

  // Show loading skeleton while fetching
  if (loading) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />
        <div className="mt-10 space-y-2">
          <Title title={`${username}'s Favorites`} />

          {/* Loading placeholder grid */}
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

  // Render favorited movies
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-4">
        <Title title={`${username}'s Favorites`} />

        {favorited.length > 0 ? (
          <>
            {/* Grid of movie posters */}
            <div className="grid grid-cols-12 gap-2">
              {favorited.map((favorite) => (
                <SmallPoster
                  key={favorite.id}
                  title={favorite.movies.title}
                  image_url={`https://image.tmdb.org/t/p/w500/${favorite.movies.poster_path}`}
                  link={`/movie/${favorite.movies.id}`}
                  release_date={favorite.movies.release_date}
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
          // Show message if no movies are favorited
          <div className="h-[150px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No movies favorited yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
