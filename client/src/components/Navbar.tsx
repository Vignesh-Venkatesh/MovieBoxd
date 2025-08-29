import { Link } from "react-router-dom";

export default function Navbar() {
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

        {/* Login/SignUp Buttons */}
        <div className="flex">
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
        </div>
      </div>
    </div>
  );
}
