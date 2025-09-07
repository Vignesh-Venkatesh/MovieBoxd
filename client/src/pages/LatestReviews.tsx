import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Top navigation bar
import Title from "../components/misc/Title"; // Section title component
import Avatar from "../components/misc/Avatar"; // User avatar component
import { showToast } from "../lib/showToast"; // Toast notification helper

// Backend URL from environment variable
const URL = import.meta.env.VITE_BACKEND_URL;

export default function LatestReviews() {
  // State to store fetched reviews
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // Number of reviews per page

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setLoading(true); // Show loading skeleton
        document.title = "Latest Reviews | MovieBoxd"; // Set page title

        // Fetch latest reviews from backend with pagination
        const res = await axios.get(
          `${URL}reviews/latest?limit=${limit}&page=${page}`
        );
        const json = res.data;

        if (json.data) {
          setReviews(json.data); // Set reviews state
        }
        setLoading(false); // Hide loading skeleton
      } catch (err: any) {
        console.error(err.message || "Failed to fetch latest reviews");
        showToast("error", "Failed to fetch latest reviews"); // Show error toast
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, [page]); // Refetch reviews when page changes

  // Show skeletons while loading first page
  if (loading && page === 1) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />

        <div className="mt-10 space-y-2">
          <Title title="Latest Reviews" />

          {/* Loading placeholders */}
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-2">
        <Title title="Latest Reviews" />

        {reviews.length > 0 ? (
          <div className="space-y-2">
            {/* Render each review */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-base-200 shadow-xl rounded p-4 flex gap-5 font-google border-2 border-transparent hover:border-green-500 duration-300 transition-colors hover:bg-base-300"
              >
                {/* Movie poster */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.movies.poster_path}`}
                  alt={review.movies.title}
                  className="h-[105px] w-[70px] rounded shadow-xl"
                />

                <div className="space-y-2">
                  {/* Movie title and release year */}
                  <Link to={`/movie/${review.movies.id}`}>
                    <h1 className="text-sm font-bold uppercase hover:text-green-500 transition-colors duration-300">
                      {review.movies.title}{" "}
                      <span className="italic text-base font-cormorant">
                        {review.movies.release_date?.slice(0, 4)}
                      </span>
                    </h1>
                  </Link>

                  <div className="space-y-4">
                    {/* User info */}
                    <div className="flex items-center gap-2 text-sm">
                      {/* Avatar with link to user profile */}
                      <Link to={`/profile/${review.profiles.display_name}`}>
                        <div className="rounded-full border-2 border-transparent hover:border-green-500 shadow-xl">
                          <Avatar
                            src={review.profiles.avatar_url}
                            username={review.profiles.display_name}
                            size="xs"
                          />
                        </div>
                      </Link>

                      {/* Username and review date */}
                      <div>
                        <Link to={`/profile/${review.profiles.display_name}`}>
                          <h1 className="font-bold text-green-300">
                            {review.profiles.display_name}
                          </h1>
                        </Link>
                        <h1 className="italic text-xs">
                          Reviewed on:{" "}
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )}
                        </h1>
                      </div>
                    </div>

                    {/* Rating stars */}
                    <div className="rating rating-xs">
                      {Array.from({ length: 5 }, (_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${review.id}`}
                          className="mask mask-star-2 bg-yellow-400"
                          checked={i < review.rating}
                          readOnly
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <h1 className="text-sm">{review.review}</h1>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="btn btn-sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="text-sm">Page {page}</span>
              <button
                className="btn btn-sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={reviews.length < limit}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          // Show message if no reviews exist
          <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
