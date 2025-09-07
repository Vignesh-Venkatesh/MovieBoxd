import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaEye,
  FaRegEye,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useAuth } from "../../stores/useAuth";
import axios from "axios";
import ReviewModal from "../reviews/ReviewModal";

// Backend URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function ActionButtons({ movieId }: { movieId: number }) {
  // Get logged-in user and token from auth store
  const { user, token } = useAuth();
  const username = user?.display_name;

  // State for movie actions
  const [watched, setWatched] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  // State for review
  const [review, setReview] = useState<{
    rating: number;
    review: string;
  } | null>(null);

  // Modal state for review editing
  const [modalOpen, setModalOpen] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [tempReview, setTempReview] = useState("");

  // Fetch initial status and review for this movie
  useEffect(() => {
    if (!username || !token) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `${URL}user/${username}/movies/${movieId}/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data?.data;

        // Set watched/favorited/watchlisted states
        setWatched(data?.watched || false);
        setFavorited(data?.favorited || false);
        setWatchlisted(data?.watchlisted || false);

        // Set review if exists
        if (data?.review) {
          setReview({ rating: data.review.rating, review: data.review.review });
          setTempRating(data.review.rating);
          setTempReview(data.review.review);
        } else {
          setReview(null);
          setTempRating(0);
          setTempReview("");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
  }, [username, movieId, token]);

  // Toggle movie action (watched/favorited/watchlisted)
  const toggle = async (
    action: "watched" | "favorited" | "watchlisted",
    state: boolean,
    setState: (v: boolean) => void
  ) => {
    if (!username || !token) return;

    const newState = !state;
    setState(newState); // optimistic UI update

    try {
      if (newState) {
        // Add action
        await axios.post(
          `${URL}user/${username}/movies/${movieId}/${action}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Remove action
        await axios.delete(
          `${URL}user/${username}/movies/${movieId}/${action}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch {
      // Revert state on failure
      setState(state);
    }
  };

  // Submit or update a review
  const submitReview = async () => {
    if (!tempRating) {
      alert("You must select a rating before submitting!");
      return;
    }
    if (!username || !token) return;

    try {
      await axios.post(
        `${URL}user/${username}/movies/${movieId}/review`,
        { rating: tempRating, review: tempReview },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state and close modal
      setReview({ rating: tempRating, review: tempReview });
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a review
  const deleteReview = async () => {
    if (!username || !token) return;

    try {
      await axios.delete(`${URL}user/${username}/movies/${movieId}/review`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reset review state
      setReview(null);
      setTempRating(0);
      setTempReview("");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Show message if user is not logged in
  if (!user || !token) {
    return (
      <div className="bg-base-200 rounded py-6 px-4 text-center font-google">
        <p className="text-sm text-gray-400">
          Log in to mark as watched, favorite, add to watchlist, or write a
          review.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded py-4 space-y-4">
      {/* Action buttons */}
      <div className="flex justify-around items-center text-2xl h-10">
        {/* Watched button */}
        {watched ? (
          <FaEye
            onClick={() => toggle("watched", watched, setWatched)}
            className="cursor-pointer text-3xl text-green-500"
          />
        ) : (
          <FaRegEye
            onClick={() => toggle("watched", watched, setWatched)}
            className="cursor-pointer text-3xl"
          />
        )}

        {/* Favorited button */}
        {favorited ? (
          <FaHeart
            onClick={() => toggle("favorited", favorited, setFavorited)}
            className="cursor-pointer text-red-500"
          />
        ) : (
          <FaRegHeart
            onClick={() => toggle("favorited", favorited, setFavorited)}
            className="cursor-pointer"
          />
        )}

        {/* Watchlisted button */}
        {watchlisted ? (
          <FaBookmark
            onClick={() => toggle("watchlisted", watchlisted, setWatchlisted)}
            className="cursor-pointer text-yellow-500"
          />
        ) : (
          <FaRegBookmark
            onClick={() => toggle("watchlisted", watchlisted, setWatchlisted)}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Review button */}
      <div className="flex justify-center items-center px-4">
        <button
          onClick={() => setModalOpen(true)}
          className={`btn font-bold w-full ${
            review
              ? "btn-neutral hover:bg-red-400 hover:text-black"
              : "btn-neutral hover:bg-green-500 hover:text-black"
          }`}
        >
          {review ? "Edit Your Review" : "Write a Review"}
        </button>
      </div>

      {/* Review preview */}
      {review && (
        <div className="px-4 py-2 mt-5 rounded space-y-2">
          {/* Show stars */}
          <div className="rating rating-sm pointer-events-none">
            {Array.from({ length: 5 }, (_, i) => (
              <input
                key={i}
                type="radio"
                name={`readonly-rating-${movieId}`}
                className="mask mask-star-2 bg-yellow-400"
                checked={i < review.rating}
                readOnly
              />
            ))}
          </div>
          {/* Review text */}
          <h1 className="text-xs font-thin">{review.review}</h1>
        </div>
      )}

      {/* Review modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={review}
        tempRating={tempRating}
        setTempRating={setTempRating}
        tempReview={tempReview}
        setTempReview={setTempReview}
        submitReview={submitReview}
        deleteReview={review ? deleteReview : undefined}
      />
    </div>
  );
}
