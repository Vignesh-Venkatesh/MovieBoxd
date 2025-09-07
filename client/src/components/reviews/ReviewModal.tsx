import { createPortal } from "react-dom";

type ReviewModalProps = {
  isOpen: boolean; // controls modal visibility
  onClose: () => void; // function to close modal
  review?: { rating: number; review: string } | null; // existing review if editing
  tempRating: number; // temporary rating while editing/creating
  setTempRating: (v: number) => void; // setter for temporary rating
  tempReview: string; // temporary review text
  setTempReview: (v: string) => void; // setter for temporary review text
  submitReview: () => void; // function to submit review
  deleteReview?: () => void; // optional function to delete review
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
  // If modal is not open, render nothing
  if (!isOpen) return null;

  // Using React Portal to render modal at document.body
  return createPortal(
    <>
      {/* Hidden checkbox to trigger modal styles (DaisyUI pattern) */}
      <input type="checkbox" className="modal-toggle" checked readOnly />

      {/* Modal container */}
      <div className="modal modal-middle backdrop-blur-lg z-[9999]">
        <div className="modal-box">
          {/* Modal title: edit or new review */}
          <h3 className="font-bold text-lg mb-4">
            {review ? "Edit Your Review" : "Write a Review"}
          </h3>

          {/* Star rating input */}
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
                  checked={tempRating === val} // highlight stars up to selected rating
                  onChange={() => setTempRating(val)} // update rating on click
                />
              );
            })}
          </div>

          {/* Review textarea */}
          <textarea
            className="textarea textarea-bordered w-full h-100 mb-4"
            placeholder="Write your review..."
            value={tempReview} // controlled input
            onChange={(e) => setTempReview(e.target.value)} // update text
          />

          {/* Modal action buttons */}
          <div className="modal-action flex justify-between">
            <div>
              {/* Submit button */}
              <button
                className="btn btn-neutral hover:bg-green-500 hover:text-black mr-2"
                onClick={submitReview}
              >
                Submit
              </button>

              {/* Delete button: only shown if editing an existing review */}
              {review && deleteReview && (
                <button
                  className="btn bg-red-500 hover:bg-red-400 text-black"
                  onClick={deleteReview}
                >
                  Delete
                </button>
              )}
            </div>

            {/* Cancel button */}
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body // portal target
  );
}
