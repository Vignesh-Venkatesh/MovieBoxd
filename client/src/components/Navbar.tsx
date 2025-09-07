import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../stores/useAuth";
import Avatar from "./misc/Avatar";

export default function Navbar() {
  const { user, clearAuth } = useAuth(); // Get current user and logout function
  const [term, setTerm] = useState(""); // Search input state
  const navigate = useNavigate(); // Navigation hook

  // Logout handler
  const handleLogout = () => {
    clearAuth();
  };

  // Search form submission handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      // Navigate to search page with query
      navigate(`/movies/search?q=${encodeURIComponent(term)}&page=1`);
      setTerm(""); // Reset search input
    }
  };

  return (
    // Navbar container
    <div className="my-4 flex justify-between items-end">
      {/* MovieBoxd Logo */}
      <div className="w-1/4">
        <Link to={"/"}>
          <h1 className="font-black tracking-wide text-3xl text-shadow text-green-100">
            MovieBoxd
          </h1>
        </Link>
      </div>

      {/* Right side: search + auth */}
      <div className="flex gap-5 w-full justify-end items-end">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center input input-sm"
        >
          {/* Search icon */}
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          {/* Search input */}
          <input
            type="search"
            placeholder="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
            required
          />

          {/* Hidden submit button so Enter works */}
          <button type="submit" hidden />
        </form>

        {/* Auth Section */}
        <div className="flex items-center">
          {user ? (
            // Avatar and dropdown if logged in
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <Avatar
                  src={user.avatar_url}
                  username={user.display_name || user.email}
                  size="w-8 h-8"
                />
              </div>

              {/* Dropdown menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu text-xs font-semibold text-center bg-base-100 rounded-box z-1 w-20 p-1 space-y-1 shadow-sm rounded-sm"
              >
                {/* Profile link */}
                <li>
                  <Link to={`/profile/${user.display_name}`}>
                    <h1>Profile</h1>
                  </Link>
                </li>
                {/* Logout button */}
                <li>
                  <h1
                    className="text-center bg-red-500 text-black hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </h1>
                </li>
              </ul>
            </div>
          ) : (
            // Login / Sign Up buttons if not logged in
            <>
              <Link to="/login">
                <button className="btn btn-sm btn-base-300 hover:bg-green-400 hover:text-black hover:border-transparent">
                  Log In
                </button>
              </Link>
              <div className="divider divider-horizontal"></div>
              <Link to="/signup">
                <button className="btn btn-sm btn-base-300 hover:bg-green-400 hover:text-black hover:border-transparent">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
