import { createPortal } from "react-dom";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  review?: { rating: number; review: string } | null;
  tempRating: number;
  setTempRating: (v: number) => void;
  tempReview: string;
  setTempReview: (v: string) => void;
  submitReview: () => void;
  deleteReview?: () => void;
};

export default function ReviewModal({
  isOpen,
  onClose,
  review,
  tempRating,
  setTempRating,
  tempReview,
  setTempReview,
  submitReview,
  deleteReview,
}: ReviewModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <input type="checkbox" className="modal-toggle" checked readOnly />
      <div className="modal modal-middle backdrop-blur-lg z-[9999]">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {review ? "Edit Your Review" : "Write a Review"}
          </h3>

          {/* Star rating */}
          <div className="rating mb-4">
            {Array.from({ length: 5 }, (_, i) => {
              const val = i + 1;
              return (
                <input
                  key={val}
                  type="radio"
                  name="modal-rating"
                  className="mask mask-star-2 bg-yellow-400"
                  value={val}
                  checked={tempRating === val}
                  onChange={() => setTempRating(val)}
                />
              );
            })}
          </div>

          {/* Review input */}
          <textarea
            className="textarea textarea-bordered w-full h-100 mb-4"
            placeholder="Write your review..."
            value={tempReview}
            onChange={(e) => setTempReview(e.target.value)}
          />

          <div className="modal-action flex justify-between">
            <div>
              <button
                className="btn btn-neutral hover:bg-green-500 hover:text-black mr-2"
                onClick={submitReview}
              >
                Submit
              </button>
              {review && deleteReview && (
                <button
                  className="btn bg-red-500 hover:bg-red-400 text-black"
                  onClick={deleteReview}
                >
                  Delete
                </button>
              )}
            </div>
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
