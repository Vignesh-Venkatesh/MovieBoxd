import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileLoading from "../components/loading/ProfileLoading";
import ProfileInfo from "../components/profile/ProfileInfo";
import Navbar from "../components/Navbar";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";

import type {
  UserWatched,
  UserStats,
  User,
  UserFavorited,
  UserWatchlist,
  UserReviews,
} from "../lib/types";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const { username } = useParams();
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

  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setUserLoading(true);
        document.title = `${username} | MovieBoxd`;

        const res = await axios.get(`${URL}user/${username}`);
        const json = res.data;

        if (json.data) {
          setUser(json.data);
        } else {
          navigate("/");
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user info");
        showToast("error", "Failed to fetch user info");
        setUserLoading(true);
      }
    };

    const fetchUserStats = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/stats`);
        const json = res.data;

        if (json.data) {
          setUserStats(json.data);
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user stats");
        showToast("error", "Failed to fetch user stats");
        setUserLoading(true);
      }
    };

    const fetchUserWatched = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/watched`);
        const json = res.data;

        if (json.data) {
          setUserWatched(json.data.slice(0, 9));
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user watched");
        showToast("error", "Failed to fetch user watched");
        setUserLoading(true);
      }
    };

    const fetchUserFavorites = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/favorites`);
        const json = res.data;

        if (json.data) {
          setUserFavorited(json.data.slice(0, 9));
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user favorites");
        showToast("error", "Failed to fetch user favorites");
        setUserLoading(true);
      }
    };

    const fetchUserWatchlisted = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/watchlist`);
        const json = res.data;

        if (json.data) {
          setUserWatchlist(json.data.slice(0, 9));
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user watchlist");
        showToast("error", "Failed to fetch user watchlist");
        setUserLoading(true);
      }
    };

    const fetchUserReviews = async () => {
      try {
        setUserLoading(true);

        const res = await axios.get(`${URL}user/${username}/reviews`);
        const json = res.data;

        if (json.data) {
          setUserReviews(json.data.slice(0, 9));
        }
        setUserLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch user reviews");
        showToast("error", "Failed to fetch user reviews");
        setUserLoading(true);
      }
    };

    fetchUserInfo();
    fetchUserStats();
    fetchUserWatched();
    fetchUserFavorites();
    fetchUserWatchlisted();
    fetchUserReviews();
  }, [username]);

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      {/* toaster */}
      <AppToaster />

      <div className="mt-10">
        {userLoading ? (
          <ProfileLoading key={username} />
        ) : user ? (
          <ProfileInfo
            key={user.id}
            user={user}
            stats={userStats}
            watched={userWatched}
            favorites={userFavorited}
            watchlisted={userWatchlist}
            reviews={userReviews}
          />
        ) : null}
      </div>
    </div>
  );
}
