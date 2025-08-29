import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";
import MovieLoading from "../components/loading/MovieLoading";
import MovieInfo from "../components/movies/MovieInfo";

import type { Movie, Cast } from "../lib/types";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [cast, setCast] = useState<Cast[] | null>([]);

  const [movieLoading, setMovieLoading] = useState(true);
  const [castLoading, setCastLoading] = useState(true);
  const loading = movieLoading || castLoading;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        setMovieLoading(true);

        const res = await axios.get(`${URL}movies/${id}`);
        const json = res.data;

        if (json.data) {
          setMovie(json.data);
          document.title = `${json.data.title} | MovieBoxd`;
        } else {
          navigate("/");
        }
        setMovieLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch movie info");
        showToast("error", "Failed to fetch movie info");
        setMovieLoading(true);
      }
    };

    const fetchMovieCastInfo = async () => {
      try {
        setCastLoading(true);

        const res = await axios.get(`${URL}movies/${id}/credits`);
        const json = res.data;

        if (json.data) {
          setCast(json.data.cast);
        }
        setCastLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch cast info");
        showToast("error", "Failed to fetch cast info");
        setCastLoading(true);
      }
    };

    fetchMovieInfo();
    fetchMovieCastInfo();
  }, [id]);

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      {/* toaster */}
      <AppToaster />

      {loading ? (
        <MovieLoading key={id} />
      ) : movie ? (
        <MovieInfo key={id} movie={movie} cast={cast} />
      ) : null}
    </div>
  );
}
