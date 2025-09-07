import { FaUnlink } from "react-icons/fa";
import { Link } from "react-router-dom";

type PosterProps = {
  title: string;
  image_url?: string;
  link?: string;
  release_date?: string;
};

export default function LargePoster({
  title,
  image_url,
  link,
  release_date,
}: PosterProps) {
  const PosterContent = (
    <div className={link ? "tooltip tooltip-bottom" : ""}>
      {/* Tooltip */}
      {link && (
        <h1 className="tooltip-content font-semibold text-xs bg-base-300 p-2 shadow-xl">
          {title} {release_date && `(${release_date.slice(0, 4)})`}
        </h1>
      )}

      {/* Poster Image or Placeholder */}
      {image_url ? (
        <div className="rounded-md bg-base-200 w-[230px] h-[345px] flex justify-center items-center border-2 border-transparent hover:border-green-500 transition-colors duration-300 shadow-lg">
          <img
            src={image_url}
            alt={title}
            className="rounded-md shadow-lg object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="rounded-md bg-base-200 w-[230px] h-[345px] flex justify-center items-center border-2 border-transparent hover:border-accent transition-colors duration-300">
          <FaUnlink className="text-neutral-content opacity-50 text-5xl shadow-lg" />
        </div>
      )}
    </div>
  );

  return link ? <Link to={link}>{PosterContent}</Link> : PosterContent;
}
