import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Avatar, Tooltip, Loader } from "@mantine/core";

export default function Profile() {
  const name = "John Doe";

  const apiUrl = `${import.meta.env.VITE_API_URL}/movies/popular`;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // useEffect hook to fetch the popular movies for the carousel
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json()) // returning json response
      .then((data) => {
        setMovies(data.results); // setting movies list
        console.log(data.results);
        setLoading(false); // set loading to false when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <>
      <Navbar />

      {/* User Intro */}
      <div className="w-[1000px] m-auto mt-5">
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center w-1/2">
            <Avatar key={name} name={name} color="initials" size="lg" />
            <h1 className="ml-5 text-xl font-bold text-slate-200">{name}</h1>
          </div>

          <div className="flex w-1/4 justify-around text-slate-200">
            {/* Films Watched */}
            <div className="text-sm text-center font-bold">
              <h1 className="text-xl">51</h1>
              <h1 className="font-thin">Films Watched</h1>
            </div>

            {/* Vertical Separator */}
            <div className="border-l-[1px] border-slate-400 mx-5"></div>

            {/* Films Reviewed */}
            <div className="text-sm text-center font-bold">
              <h1 className="text-xl font-bold">17</h1>
              <h1 className="font-thin">Films Reviewed</h1>
            </div>
          </div>
        </div>

        {/* Recently Watched & Watchlist */}
        <div className="flex w-[1000px] justify-between">
          {/* Left Half */}
          <div className="w-3/4 mr-5">
            {/* Recently Watched */}
            <div className="mb-5">
              <div className="flex justify-between items-end">
                <h1 className="text-slate-400 uppercase">Recently Watched</h1>
                <h1 className="text-slate-400 uppercase hover:text-orange-400 hover:cursor-pointer text-sm">
                  ALL
                </h1>
              </div>
              <hr className="my-2 opacity-30" />
              {/* Movie Posters and Data */}
              <div className="flex gap-2 flex-wrap mt-4 justify-start">
                {loading ? (
                  <Loader color="#fb923c" type="bars" size="sm" />
                ) : (
                  // (also showing only 14 results)
                  movies.slice(0, 2).map((movie) => (
                    <Tooltip
                      key={movie.id}
                      withArrow
                      arrowSize={6}
                      position="bottom"
                      label={`${movie.title} (${movie.release_date.slice(
                        0,
                        4
                      )})`}
                      color="#334155"
                      className="text-slate-400 font-bold text-xs"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="w-32 border-2 border-transparent rounded hover:border-orange-400 transition-all duration-200 hover:cursor-pointer"
                      />
                    </Tooltip>
                  ))
                )}
              </div>
            </div>

            {/* Recently Reviewed */}
            <div>
              <div className="flex justify-between items-end">
                <h1 className="text-slate-400 uppercase">Recently Reviewed</h1>
                <h1 className="text-slate-400 uppercase hover:text-orange-400 hover:cursor-pointer text-sm">
                  ALL
                </h1>
              </div>
              <hr className="my-2 opacity-30" />
              {/* Movie Posters and Data */}
              <div className="flex gap-2 flex-wrap mt-4 justify-start">
                {loading ? (
                  <Loader color="#fb923c" type="bars" size="sm" />
                ) : (
                  // (also showing only 14 results)
                  movies.slice(0, 5).map((movie) => (
                    <Tooltip
                      key={movie.id}
                      withArrow
                      arrowSize={6}
                      position="bottom"
                      label={`${movie.title} (${movie.release_date.slice(
                        0,
                        4
                      )})`}
                      color="#334155"
                      className="text-slate-400 font-bold text-xs"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="w-32 border-2 border-transparent rounded hover:border-orange-400 transition-all duration-200 hover:cursor-pointer"
                      />
                    </Tooltip>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Middle padding */}
          <div className="w-1/12"></div>

          {/* Right Half */}
          {/* Watchlist */}
          <div className="w-1/4">
            <div className="flex justify-between items-end">
              <h1 className="text-slate-400 uppercase">Watchlist</h1>
              <h1 className="text-slate-400 uppercase hover:text-orange-400 hover:cursor-pointer text-sm">
                ALL
              </h1>
            </div>
            <hr className="my-2 opacity-30" />
            {/* Movie Posters and Data */}
            <div className="flex gap-2 flex-wrap mt-4 justify-start">
              {loading ? (
                <Loader color="#fb923c" type="bars" size="sm" />
              ) : (
                // (also showing only 14 results)
                movies.slice(0, 14).map((movie) => (
                  <Tooltip
                    key={movie.id}
                    withArrow
                    arrowSize={6}
                    position="bottom"
                    label={`${movie.title} (${movie.release_date.slice(0, 4)})`}
                    color="#334155"
                    className="text-slate-400 font-bold text-xs"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-16 border-2 scale-105 border-transparent rounded hover:border-orange-400 hover:scale-110 transition-all duration-200 hover:cursor-pointer"
                    />
                  </Tooltip>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
