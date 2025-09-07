import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// importing pages for routing
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Movie from "./pages/Movie";
import Person from "./pages/Person";
import Profile from "./pages/Profile";
import UserReviews from "./pages/UserReviews";
import UserWatched from "./pages/UserWatched";
import UserFavorited from "./pages/UserFavorites";
import UserWatchlist from "./pages/UserWatchlist";
import PopularMovies from "./pages/PopularMovies";
import NowPlaying from "./pages/NowPlaying";
import NotFoundPage from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import LatestReviews from "./pages/LatestReviews";

// footer component displayed on all pages
import Footer from "./components/Footer";

export default function App() {
  const [isWideEnough, setIsWideEnough] = useState(window.innerWidth >= 960);

  useEffect(() => {
    const handleResize = () => setIsWideEnough(window.innerWidth >= 960);
    window.addEventListener("resize", handleResize);

    // cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isWideEnough) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-4">
        <h1 className="text-lg font-bold">
          Sorry, MovieBoxd is only available on devices with minimum width of
          960px.
        </h1>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* home page */}
        <Route path="/" element={<Home />} />

        {/* authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* movie search page */}
        <Route path="/movies/search" element={<SearchPage />} />

        {/* latest reviews page */}
        <Route path="/latest-reviews" element={<LatestReviews />} />

        {/* movie lists */}
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/movies/now-playing" element={<NowPlaying />} />

        {/* individual movie and person pages */}
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/person/:id" element={<Person />} />

        {/* user profile page */}
        <Route path="/profile/:username" element={<Profile />} />

        {/* user-specific pages */}
        <Route path="/user/:username/reviews" element={<UserReviews />} />
        <Route path="/user/:username/watched" element={<UserWatched />} />
        <Route path="/user/:username/favorites" element={<UserFavorited />} />
        <Route path="/user/:username/watchlist" element={<UserWatchlist />} />

        {/* fallback route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* footer rendered on all pages */}
      <Footer />
    </Router>
  );
}
