import { FaUnlink } from "react-icons/fa";
import { Link } from "react-router-dom";

type PosterProps = {
  title: string;
  image_url?: string;
  link?: string;
  release_date?: string;
};

export default function SmallPoster({
  title,
  image_url,
  link,
  release_date,
}: PosterProps) {
  return (
    <Link to={`${link}`}>
      <div className="tooltip tooltip-bottom">
        <h1 className="tooltip-content font-semibold text-xs bg-base-300 p-2 shadow-xl">
          {title} ({release_date?.slice(0, 4)})
        </h1>
        {image_url ? (
          <div className="rounded bg-base-200 w-[70px] h-[105px] flex justify-center items-center border-2 border-transparent hover:border-green-500 transition-colors duration-300 cursor-pointer shadow-md">
            <img src={`${image_url}`} alt={`${title}`} className="rounded-md" />
          </div>
        ) : (
          <div className="rounded bg-base-200 w-[70px] h-[105px] flex justify-center items-center border-2 border-transparent hover:border-accent transition-colors duration-300 cursor-pointer">
            <FaUnlink className="text-neutral-content opacity-50 text-5xl shadow-md" />
          </div>
        )}
      </div>
    </Link>
  );
}
