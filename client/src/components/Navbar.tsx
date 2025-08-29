import { Link } from "react-router-dom";

import { useAuth } from "../stores/useAuth";
import Avatar from "./misc/Avatar";

export default function Navbar() {
  const { user } = useAuth();

  const { clearAuth } = useAuth();

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <div className="my-4 flex justify-between items-end">
      {/* MovieBoxd Logo */}
      <div className="w-1/4">
        <Link to={"/"}>
          <h1 className="font-black tracking-wide text-3xl text-shadow text-green-100">
            MovieBoxd
          </h1>
        </Link>
      </div>

      <div className="flex gap-5 w-full justify-end items-end">
        {/* Search */}
        <label className="input input-sm">
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
          <input type="search" required placeholder="Search" />
        </label>

        {/* Auth Section */}
        <div className="flex items-center">
          {user ? (
            // Avatar - if user logged in
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <Avatar
                  src={user.avatar_url}
                  username={user.display_name || user.email}
                  size="w-8 h-8"
                />
              </div>

              {/* dropdown menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu text-xs font-semibold text-center bg-base-100 rounded-box z-1 w-20 p-1 space-y-1 shadow-sm rounded-sm"
              >
                <li>
                  <Link to={`/profile/${user.display_name}`}>
                    <h1>Profile</h1>
                  </Link>
                </li>
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
            // Login/SignUp Buttons - if user not logged in
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
