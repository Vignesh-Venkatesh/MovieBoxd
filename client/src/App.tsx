import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/movies/now-playing" element={<NowPlaying />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/profile/:username" element={<Profile />} />

        <Route path="/user/:username/reviews" element={<UserReviews />} />
        <Route path="/user/:username/watched" element={<UserWatched />} />
        <Route path="/user/:username/favorites" element={<UserFavorited />} />
        <Route path="/user/:username/watchlist" element={<UserWatchlist />} />
      </Routes>
      <Footer />
    </Router>
  );
}
