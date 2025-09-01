import { Link } from "react-router-dom";
import Avatar from "../misc/Avatar";
import type { User, UserReviews } from "../../lib/types";

type ReviewBoxProps = {
  user: User;
  review: UserReviews;
};

export default function ReviewBox({ user, review }: ReviewBoxProps) {
  return (
    <div className="bg-base-200 shadow-xl rounded p-4 flex gap-5 font-google border-2 border-transparent hover:border-green-500 duration-300 transition-colors hover:bg-base-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${review.movies.poster_path}`}
        alt={review.movies.title}
        className="h-[105px] w-[70px] rounded shadow-xl"
      />

      <div className="space-y-2">
        {/* movie title */}
        <Link to={`/movie/${review.movies.id}`}>
          <h1 className="text-sm font-bold uppercase hover:text-green-500 transition-colors duration-300">
            {review.movies.title}{" "}
            <span className="italic text-base font-cormorant">
              {review.movies.release_date?.slice(0, 4)}
            </span>
          </h1>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            {/* user avatar */}
            <Link to={`/profile/${user.display_name}`}>
              <div className="rounded-full border-2 border-transparent hover:border-green-500 shadow-xl">
                <Avatar
                  src={user.avatar_url}
                  username={user.display_name}
                  size="xs"
                />
              </div>
            </Link>

            {/* user review info */}
            <div>
              {/* username */}
              <Link to={`/profile/${user.display_name}`}>
                <h1 className="font-bold text-green-300">
                  {user.display_name}
                </h1>
              </Link>

              {/* reviewed on */}
              <h1 className="italic text-xs">
                Reviewed on:{" "}
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </h1>
            </div>
          </div>

          {/* rating stars */}
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

          {/* review text */}
          <h1 className="text-sm">{review.review}</h1>
        </div>
      </div>
    </div>
  );
}
