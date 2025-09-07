import { useEffect, useState } from "react";
import axios from "axios";
import MovieReviewBox from "./MovieReviewBox";
import Title from "../misc/Title";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function MovieReviews({ movieId }: { movieId: number }) {
  const [reviews, setReviews] = useState<any[]>([]); // Stores latest reviews
  const [loading, setLoading] = useState(true); // Loading state for fetch

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch latest 10 reviews for the given movie
        const res = await axios.get(
          `${URL}movies/${movieId}/latest-reviews?limit=10`
        );
        setReviews(res.data?.data || []); // Update state with fetched reviews
      } catch (err) {
        console.error("Failed to fetch movie reviews", err); // Log error
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchReviews();
  }, [movieId]);

  // Loading skeleton UI
  if (loading) {
    return (
      <div className="space-y-2">
        <Title title="Latest Reviews" />
        <div className="skeleton h-30 w-full rounded"></div>
        <div className="skeleton h-30 w-full rounded"></div>
        <div className="skeleton h-30 w-full rounded"></div>
        <div className="skeleton h-30 w-full rounded"></div>
        <div className="skeleton h-30 w-full rounded"></div>
      </div>
    );
  }

  // No reviews available
  if (reviews.length === 0) {
    return (
      <div className="space-y-2">
        <Title title="Latest Reviews" />
        <p className="italic text-sm opacity-50">
          No reviews yet for this movie. Be the first one to review.
        </p>
      </div>
    );
  }

  // Render fetched reviews
  return (
    <div className="space-y-2 mt-6">
      <Title title="Latest Reviews" />
      {reviews.map((r) => (
        <MovieReviewBox key={r.id} review={r} />
      ))}
    </div>
  );
}
