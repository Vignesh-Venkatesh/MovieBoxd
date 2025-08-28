import Navbar from "../components/Navbar";
import PopularMovies from "../components/movies/PopularMovies";

export default function Home() {
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      <div className="h-10"></div>
      <PopularMovies />
    </div>
  );
}
