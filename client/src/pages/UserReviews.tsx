import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { showToast } from "../lib/showToast";
import ReviewBox from "../components/reviews/ReviewBox";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/misc/Title";

import type { UserReviews as UserReviewType, User } from "../lib/types";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserReviews() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [userReviews, setUserReviews] = useState<UserReviewType[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // pagination state
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setUserLoading(true);
        document.title = `${username}'s Reviews | MovieBoxd`;

        const res = await axios.get(`${URL}user/${username}`);
        const json = res.data;

        if (json.data) {
          setUser(json.data);
        } else {
          navigate("/");
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

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(
          `${URL}user/${username}/reviews?limit=${limit}&page=${page}`
        );
        const json = res.data;

        if (json.data) {
          setUserReviews(json.data);
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

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      <div className="mt-10 space-y-2">
        <Title title={`${user?.display_name}'s Reviews`} />

        {user && userReviews.length > 0 ? (
          <div className="space-y-2">
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
                disabled={userReviews.length < limit}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No movies reviewed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
