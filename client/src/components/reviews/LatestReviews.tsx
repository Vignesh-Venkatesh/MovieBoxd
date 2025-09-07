import { useState, useEffect } from "react";
import { showToast } from "../../lib/showToast";
import ReviewBox from "./ReviewBox";
import axios from "axios";
import Title from "../misc/Title";

import type { User, Movie, UserReviews } from "../../lib/types";

const URL = import.meta.env.VITE_BACKEND_URL;

// Local type for latest reviews response
type LatestReview = UserReviews & {
  profiles: User; // user who wrote the review
  movies: Movie; // movie that was reviewed
};

export default function LatestReviews() {
  // State to store fetched reviews
  const [reviews, setReviews] = useState<LatestReview[]>([]);
  const [loading, setLoading] = useState(true); // loading state for fetch

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setLoading(true); // start loading

        // Fetch latest reviews from backend
        const res = await axios.get(`${URL}reviews/latest`);
        const json = res.data;

        // Store data in state if present
        if (json.data) {
          setReviews(json.data);
        }

        setLoading(false); // end loading
      } catch (err: any) {
        console.error(err.message || "Failed to fetch latest reviews");
        showToast("error", "Failed to fetch latest reviews"); // show toast on error
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  // Render skeletons while loading
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

  // Render latest reviews or empty state
  return (
    <div className="mx-auto font-google">
      <Title title="Latest Reviews" link="/latest-reviews" />
      <div className="mt-2 space-y-2">
        {reviews.length > 0 ? (
          <div className="space-y-2">
            {/* Map through each review and render ReviewBox */}
            {reviews.map((r, idx) => (
              <ReviewBox key={idx} user={r.profiles} review={r} />
            ))}
          </div>
        ) : (
          // Show empty state if no reviews
          <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
            <p>No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
