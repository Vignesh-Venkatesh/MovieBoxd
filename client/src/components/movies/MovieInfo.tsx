import type { Movie, Cast } from "../../lib/types";
import LargePoster from "../poster/LargePoster";
import CastList from "../cast/CastList";
import SimilarMovies from "./SimilarMovies";

type MovieInfoProps = {
  movie: Movie;
  cast?: Cast[] | null;
};

export default function MovieInfo({ movie, cast }: MovieInfoProps) {
  return (
    <div className="font-google">
      {/* backdrop */}
      <div>
        {movie.backdrop_path ? (
          <div className="opacity-90 absolute -top-20 left-1/2 -translate-x-1/2 -z-10 overflow-hidden w-[1200px] h-[600px] animate-fade-in">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              loading="lazy"
            />
            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-82 bg-gradient-to-b from-transparent to-base-100" />
            {/* left fade */}
            <div className="absolute top-0 left-0 w-82 h-full bg-gradient-to-l from-transparent to-base-100" />
            {/* right fade */}
            <div className="absolute top-0 right-0 w-82 h-full bg-gradient-to-r from-transparent to-base-100" />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={movie.backdrop_path ? "mt-100" : "mt-10"}>
        <div className="flex justify-between animate-fade-in">
          <LargePoster
            title={movie.title}
            image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            release_date={movie.release_date}
          />

          {/* title, overview, cast, reviews, actions*/}
          <div className="space-y-2 ">
            {/* title */}
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
              {/* overview, reviews, cast */}
              <div className="w-[390px] space-y-10 ">
                {movie.overview && <p>{movie.overview}</p>}

                {/* cast */}
                {cast && <CastList cast={cast} />}
              </div>

              {/* actions */}
              <div className=" w-[230px]"></div>
            </div>
          </div>
        </div>
      </div>

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
