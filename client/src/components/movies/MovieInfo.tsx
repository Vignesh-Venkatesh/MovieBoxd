import type { Movie, Cast } from "../../lib/types";
import LargePoster from "../poster/LargePoster";
import CastList from "../cast/CastList";
import SimilarMovies from "./SimilarMovies";
import ActionButtons from "../action/ActionButtons";
import MovieReviews from "./MovieReviews";

type MovieInfoProps = {
  movie: Movie; // Movie object with details
  cast?: Cast[] | null; // Optional array of cast members
};

export default function MovieInfo({ movie, cast }: MovieInfoProps) {
  return (
    <div className="font-google">
      {/* Backdrop image section */}
      <div>
        {movie.backdrop_path ? (
          <div className="opacity-90 absolute -top-10 left-1/2 -translate-x-1/2 -z-10 overflow-hidden w-[1200px] h-[600px] animate-fade-in">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              loading="lazy"
            />
            {/* Fades for better text readability */}
            <div className="absolute bottom-0 left-0 w-full h-82 bg-gradient-to-b from-transparent to-base-100" />
            <div className="absolute top-0 left-0 w-82 h-full bg-gradient-to-l from-transparent to-base-100" />
            <div className="absolute top-0 right-0 w-82 h-full bg-gradient-to-r from-transparent to-base-100" />
          </div>
        ) : (
          <></> // No backdrop, render nothing
        )}
      </div>

      {/* Main content */}
      <div className={movie.backdrop_path ? "mt-100" : "mt-10"}>
        <div className="flex justify-between animate-fade-in">
          {/* Large poster */}
          <LargePoster
            title={movie.title}
            image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            release_date={movie.release_date}
          />

          {/* Movie details: title, overview, cast, reviews, action buttons */}
          <div className="space-y-2 ">
            {/* Movie title with release year */}
            <div className="w-[670px]">
              <h1 className="font-cormorant text-4xl font-bold text-green-100/90">
                {movie.title}{" "}
                {movie.release_date ? (
                  <span className="text-2xl font-thin italic text-neutral-content">
                    {movie.release_date.slice(0, 4)}
                  </span>
                ) : (
                  <></>
                )}
              </h1>
            </div>

            <div className="flex justify-between mt-10">
              {/* Left column: overview, cast, reviews */}
              <div className="w-[390px] space-y-10 ">
                {/* Overview paragraph */}
                {movie.overview && <p>{movie.overview}</p>}

                {/* Cast list */}
                {cast && <CastList cast={cast} />}

                {/* Reviews section */}
                <MovieReviews movieId={movie.id} />
              </div>

              {/* Right column: action buttons (watched, favorite, watchlist, review) */}
              <div className=" w-[230px]">
                <ActionButtons movieId={movie.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar movies section */}
      <div className="mt-10">
        <SimilarMovies
          movie_name={movie.title}
          tmdb_id={movie.id}
          quantity={12}
          cols={12}
          rows={1}
        />
      </div>
    </div>
  );
}
