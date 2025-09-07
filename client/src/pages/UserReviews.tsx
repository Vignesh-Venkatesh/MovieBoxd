// React and hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Helpers
import { showToast } from "../lib/showToast";
import axios from "axios";

// Components
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";
import ReviewBox from "../components/reviews/ReviewBox";

// Types
import type { UserReviews as UserReviewType, User } from "../lib/types";

// Backend URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserReviews() {
  // Get username from URL
  const { username } = useParams();
  const navigate = useNavigate();

  // State
  const [userReviews, setUserReviews] = useState<UserReviewType[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 5; // reviews per page

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setUserLoading(true);
        document.title = `${username}'s Reviews | MovieBoxd`;

        const res = await axios.get(`${URL}user/${username}`);
        const json = res.data;

        if (json.data) {
          setUser(json.data); // set user info
        } else {
          navigate("/"); // redirect if user not found
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user info");
        showToast("error", "Failed to fetch user info");
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [username, navigate]);

  // Fetch user reviews
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(
          `${URL}user/${username}/reviews?limit=${limit}&page=${page}`
        );
        const json = res.data;

        if (json.data) {
          setUserReviews(json.data); // set reviews for current page
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user reviews");
        showToast("error", "Failed to fetch user reviews");
        setUserLoading(false);
      }
    };

    if (username) {
      fetchUserReviews();
    }
  }, [username, page]);

  // Loading skeleton for initial load
  if (userLoading && page === 1) {
    return (
      <div className="min-h-screen w-[950px] mx-auto font-google">
        <Navbar />

        <div className="mt-10 space-y-2">
          <Title title={`${user?.display_name}'s Reviews`} />
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
        </div>
      </div>
    );
  }

  // Render reviews
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-2">
        <Title title={`${user?.display_name}'s Reviews`} />

        {user && userReviews.length > 0 ? (
          <div className="space-y-2">
            {/* List of reviews */}
            {userReviews.map((ur, idx) => (
              <ReviewBox key={idx} user={user} review={ur} />
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
                disabled={userReviews.length < limit} // disable if fewer than limit
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          // No reviews message
          <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No movies reviewed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
