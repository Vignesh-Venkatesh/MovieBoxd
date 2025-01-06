import { useState, useEffect } from "react";
import { Tooltip, Loader } from "@mantine/core";

export default function MoviesList({ apiRoute, title }) {
  const apiUrl = `${import.meta.env.VITE_API_URL}${apiRoute}`;
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
    <div className="w-[1000px] m-auto mt-5 font-normal text-sm">
      <div className="flex justify-between items-end mb-1">
        <h1 className="text-slate-400 uppercase">{title}</h1>
        <h1 className="text-slate-400 text-xs hover:text-orange-400 hover:cursor-pointer">
          more
        </h1>
      </div>
      <hr className="opacity-30" />

      <div className="flex gap-2 flex-wrap mt-4 justify-center">
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
  );
}
