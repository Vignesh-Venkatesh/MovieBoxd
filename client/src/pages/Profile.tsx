// Importing necessary hooks and libraries
import { useParams, useNavigate } from "react-router-dom"; // for accessing route params and navigation
import { useState, useEffect } from "react"; // React hooks
import ProfileLoading from "../components/loading/ProfileLoading"; // skeleton loader for profile
import ProfileInfo from "../components/profile/ProfileInfo"; // main profile display component
import Navbar from "../components/Navbar"; // navigation bar
import AppToaster from "../components/misc/Toaster"; // toast notifications
import { showToast } from "../lib/showToast"; // function to show toast notifications

// Importing type definitions for TypeScript
import type {
  UserWatched,
  UserStats,
  User,
  UserFavorited,
  UserWatchlist,
  UserReviews,
} from "../lib/types";

// Axios for HTTP requests
import axios from "axios";

// Backend API base URL from environment variables
const URL = import.meta.env.VITE_BACKEND_URL;

// Main Profile component
export default function Profile() {
  // Get username from URL params
  const { username } = useParams();

  // State to store user data
  const [user, setUser] = useState<User>();
  const [userStats, setUserStats] = useState<UserStats | null>();
  const [userWatched, setUserWatched] = useState<UserWatched[] | null>([]);
  const [userFavorited, setUserFavorited] = useState<UserFavorited[] | null>(
    []
  );
  const [userWatchlist, setUserWatchlist] = useState<UserWatchlist[] | null>(
    []
  );
  const [userReviews, setUserReviews] = useState<UserReviews[] | null>([]);

  // Loading state for the entire profile
  const [userLoading, setUserLoading] = useState(true);

  // Navigate programmatically (for 404 redirect)
  const navigate = useNavigate();

  // useEffect to fetch all user-related data when username changes
  useEffect(() => {
    // Fetch basic user info
    const fetchUserInfo = async () => {
      try {
        setUserLoading(true); // set loading
        document.title = `${username} | MovieBoxd`; // update page title

        const res = await axios.get(`${URL}user/${username}`);
        const json = res.data;

        if (json.data) {
          setUser(json.data); // store user data
        } else {
          navigate("*"); // redirect to 404 if no user found
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user info");
        showToast("error", "Failed to fetch user info");
        setUserLoading(true); // maintain loading if error occurs
      }
    };

    // Fetch user statistics (like total watched, favorites, etc.)
    const fetchUserStats = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/stats`);
        const json = res.data;

        if (json.data) {
          setUserStats(json.data); // store stats
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user stats");
        showToast("error", "Failed to fetch user stats");
        setUserLoading(true);
      }
    };

    // Fetch recently watched movies
    const fetchUserWatched = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/watched`);
        const json = res.data;

        if (json.data) {
          setUserWatched(json.data.slice(0, 9)); // take only first 9
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user watched");
        showToast("error", "Failed to fetch user watched");
        setUserLoading(true);
      }
    };

    // Fetch favorited movies
    const fetchUserFavorites = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/favorites`);
        const json = res.data;

        if (json.data) {
          setUserFavorited(json.data.slice(0, 9)); // first 9 favorites
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user favorites");
        showToast("error", "Failed to fetch user favorites");
        setUserLoading(true);
      }
    };

    // Fetch watchlist movies
    const fetchUserWatchlisted = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/watchlist`);
        const json = res.data;

        if (json.data) {
          setUserWatchlist(json.data.slice(0, 9)); // first 9 watchlist items
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user watchlist");
        showToast("error", "Failed to fetch user watchlist");
        setUserLoading(true);
      }
    };

    // Fetch user reviews
    const fetchUserReviews = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/reviews`);
        const json = res.data;

        if (json.data) {
          setUserReviews(json.data.slice(0, 9)); // first 9 reviews
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user reviews");
        showToast("error", "Failed to fetch user reviews");
        setUserLoading(true);
      }
    };

    // Call all fetch functions
    fetchUserInfo();
    fetchUserStats();
    fetchUserWatched();
    fetchUserFavorites();
    fetchUserWatchlisted();
    fetchUserReviews();
  }, [username]); // re-run when username changes

  // Render profile page
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar /> {/* Top navigation bar */}
      <AppToaster /> {/* Toast notifications */}
      <div className="mt-10">
        {userLoading ? (
          <ProfileLoading key={username} /> // show skeleton while loading
        ) : user ? (
          <ProfileInfo
            key={user.id}
            user={user}
            stats={userStats}
            watched={userWatched}
            favorites={userFavorited}
            watchlisted={userWatchlist}
            reviews={userReviews}
          /> // display full profile once loaded
        ) : null}
      </div>
    </div>
  );
}
