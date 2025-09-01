import { useState, useEffect } from "react";
import { showToast } from "../../lib/showToast";
import ReviewBox from "./ReviewBox";
import axios from "axios";
import Title from "../misc/Title";

import type { User, Movie, UserReviews } from "../../lib/types";

const URL = import.meta.env.VITE_BACKEND_URL;

// Local type for latest reviews response
type LatestReview = UserReviews & {
  profiles: User; // the user who wrote the review
  movies: Movie; // the movie reviewed
};

export default function LatestReviews() {
  const [reviews, setReviews] = useState<LatestReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${URL}reviews/latest`);
        const json = res.data;

        if (json.data) {
          setReviews(json.data);
        }
        setLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch latest reviews");
        showToast("error", "Failed to fetch latest reviews");
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto font-google">
        <Title title="Latest Reviews" />
        <div className="mt-2 space-y-2">
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
          <div className="h-[105px] w-full skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto font-google">
      <Title title="Latest Reviews" />
      <div className="mt-2 space-y-2">
        {reviews.length > 0 ? (
          <div className="space-y-2">
            {reviews.map((r, idx) => (
              <ReviewBox key={idx} user={r.profiles} review={r} />
            ))}
          </div>
        ) : (
          <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
