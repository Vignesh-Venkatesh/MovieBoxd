import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaEye, FaRegEye } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { useState } from "react";

export default function ActionButtons() {
  const [watched, setWatched] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [watchlisted, setWatchlisted] = useState<boolean>(false);

  const toggleWatched = () => {
    setWatched(!watched);
  };

  const toggleFavorited = () => {
    setFavorited(!favorited);
  };

  const toggleWatchlisted = () => {
    setWatchlisted(!watchlisted);
  };

  return (
    <div className="bg-base-200 rounded py-4">
      {/* watched, favorited, watchlisted */}
      <div className="flex justify-around items-center text-2xl h-10">
        {watched ? (
          <FaEye
            onClick={toggleWatched}
            className="cursor-pointer text-3xl text-green-500"
          />
        ) : (
          <FaRegEye
            onClick={toggleWatched}
            className="cursor-pointer text-3xl"
          />
        )}
        {favorited ? (
          <FaHeart
            onClick={toggleFavorited}
            className="cursor-pointer text-red-500"
          />
        ) : (
          <FaRegHeart onClick={toggleFavorited} className="cursor-pointer" />
        )}
        {watchlisted ? (
          <FaBookmark
            onClick={toggleWatchlisted}
            className="cursor-pointer text-yellow-500"
          />
        ) : (
          <FaRegBookmark
            onClick={toggleWatchlisted}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* write a review button */}
      <div className="flex justify-center items-center mt-4 px-4">
        <button className="btn btn-neutral font-thin w-full hover:font-bold hover:bg-green-500 hover:text-black">
          Write a Review
        </button>
      </div>
    </div>
  );
}
