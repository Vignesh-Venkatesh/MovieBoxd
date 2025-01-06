import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";

export default function Landing() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <Navbar />
      {/* for displaying popular movies */}
      <MoviesList apiRoute="/movies/popular" title="Popular movies this week" />
      {/* for displaying now showing movies */}
      <MoviesList apiRoute="/movies/now-showing" title="Now Showing" />
      {/* for displaying upcoming movies */}
      <MoviesList apiRoute="/movies/upcoming" title="Upcoming Movies" />
      {/* Footer */}
      {/* <div className="min-h- bg-zinc-700">hi</div> */}
    </div>
  );
}
