import { Link } from "react-router-dom";
import Avatar from "../misc/Avatar";

type MovieReviewBoxProps = {
  review: {
    id: number; // Review ID
    review: string; // Review text
    rating: number; // Rating out of 5
    created_at: string; // Date review was created
    profiles: {
      id: string; // User ID
      display_name: string; // User display name
      avatar_url: string; // User avatar URL
    };
  };
};

export default function MovieReviewBox({ review }: MovieReviewBoxProps) {
  const user = review.profiles;

  return (
    <div className="bg-base-200 shadow-xl rounded p-4 flex gap-5 font-google border-2 border-transparent hover:border-green-500 duration-300 transition-colors hover:bg-base-300">
      {/* User avatar linking to profile */}
      <Link to={`/profile/${user.display_name}`}>
        <div className="rounded-full border-2 border-transparent hover:border-green-500 shadow-xl">
          <Avatar
            src={user.avatar_url}
            username={user.display_name}
            size="md"
          />
        </div>
      </Link>

      <div className="space-y-2 flex-1">
        {/* Username and review date */}
        <div className="flex items-center justify-between">
          <Link to={`/profile/${user.display_name}`}>
            <h1 className="font-bold text-green-300 hover:text-green-500 transition-colors">
              {user.display_name}
            </h1>
          </Link>
          <h1 className="italic text-xs">
            Reviewed on:{" "}
            {new Date(review.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </h1>
        </div>

        {/* Rating stars, readonly */}
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
        <p className="text-sm">{review.review}</p>
      </div>
    </div>
  );
}
