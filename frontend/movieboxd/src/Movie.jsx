import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { Loader, Tooltip } from "@mantine/core";
import MoviesList from "./components/MoviesList";

export default function Movie() {
  // List of movie IDs for testing
  const movieIDs = [
    "762509",
    "558449",
    "1241982",
    "970450",
    "1094274",
    "157336",
    "743563",
    "432139",
    "66373",
  ];
  const movieID = "157336"; // Selected movie ID

  const movieApiUrl = `${import.meta.env.VITE_API_URL}/movie/${movieID}`;
  const castApiUrl = `${import.meta.env.VITE_API_URL}/movie/${movieID}/cast`;

  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("cast"); // to track the active section

  // useEffect hook to fetch both the movie and cast data
  useEffect(() => {
    // using Promise.all to fetch both API calls concurrently
    Promise.all([
      fetch(movieApiUrl).then((res) => res.json()),
      fetch(castApiUrl).then((res) => res.json()),
    ])
      .then(([movieData, castData]) => {
        setMovie(movieData); // setting movie details
        setCast(castData); // setting cast details
        console.log(movieData);
        console.log(castData);
        setLoading(false); // set loading to false when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // set loading to false even if there's an error
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* movie banner */}
      {loading ? (
        // loader displayed while data is fetched
        <Loader
          color="#fb923c"
          type="bars"
          size="sm"
          className="m-auto mt-10"
        />
      ) : (
        movie &&
        movie.backdrop_path && (
          <>
            <div className="relative w-full mb-10">
              {/* backdrop Image */}
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                style={{
                  maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 100%)`,
                }}
                className="w-full h-[300px] object-cover blur-md"
              />
              <div className="m-auto transform -translate-y-[15%] flex w-[1000px]">
                {/* poster Image */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-60 rounded-md shadow-lg h-[364px]"
                />
                <div className="self-start flex-col ml-5">
                  {/* movie title */}
                  <h1 className="text-4xl font-bold text-stone-200">
                    {movie.title}
                  </h1>
                  {/* date released */}
                  <h1 className="text-sm text-stone-400 font-bold">
                    {movie.release_date.slice(0, 4)}
                  </h1>

                  {/* movie tagline - only shown if exists */}
                  {movie.tagline && (
                    <h1 className="mt-2 mb-5 italic text-sm text-stone-400 font-bold">
                      "{movie.tagline}"
                    </h1>
                  )}

                  {/* movie description */}
                  <h1 className="text-stone-300 mt-5 w-[700px]">
                    {movie.overview}
                  </h1>

                  {/* cast and genre information */}
                  <div className="mt-8">
                    <div className="flex">
                      {/* cast information */}
                      <h1
                        className="font-bold uppercase text-stone-400 hover:text-orange-400 hover:cursor-pointer"
                        onClick={() => setActiveSection("cast")} // set active section to "cast"
                      >
                        Cast
                      </h1>

                      {/* vertical separator */}
                      <div className="border-l-[1px] border-slate-400 mx-5"></div>

                      {/* genre information */}
                      <h1
                        className="font-bold uppercase text-stone-400 hover:text-orange-400 hover:cursor-pointer"
                        onClick={() => setActiveSection("genre")} // set active section to "genre"
                      >
                        Genre
                      </h1>
                    </div>
                  </div>

                  {/* conditionally render cast details */}
                  {activeSection === "cast" && (
                    <div className="mt-3">
                      {cast?.cast?.map((actor) =>
                        // tooltip only renders if actor.character exists
                        actor.character ? (
                          <Tooltip
                            key={actor.id}
                            withArrow
                            arrowSize={6}
                            position="bottom"
                            label={`${actor.character}`}
                            color="#78716c"
                            className="text-stone-200 font-bold text-xs"
                          >
                            <button
                              key={actor.id}
                              className="bg-stone-700 mr-2 mb-2 px-2 py-1 rounded-sm text-[10px] uppercase font-bold text-stone-400 hover:text-orange-400 transition-all duration-200 transform"
                            >
                              {actor.name}
                            </button>
                          </Tooltip>
                        ) : (
                          <button
                            key={actor.id}
                            className="bg-stone-700 mr-2 mb-2 px-2 py-1 rounded-sm text-[10px] uppercase font-bold text-stone-400 hover:text-orange-400 transition-all duration-200 transform"
                          >
                            {actor.name}
                          </button>
                        )
                      )}
                    </div>
                  )}

                  {/* conditionally render genre details */}
                  {activeSection === "genre" && (
                    <div className="mt-3">
                      {movie.genres.map((genre) => (
                        <button
                          key={genre.id}
                          className="bg-stone-700 mr-2 mb-2 px-2 py-1 rounded-sm text-[10px] uppercase font-bold text-stone-400 hover:text-orange-400 transition-all duration-200 transform"
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* similar movies */}
            <div className="-translate-y-1/2">
              <MoviesList
                apiRoute={`/movie/${movieID}/recommendations`}
                title="Similar Movies"
              />
            </div>
          </>
        )
      )}
    </>
  );
}
