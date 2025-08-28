import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="my-4 flex justify-between items-end">
      {/* MovieBoxd Logo */}
      <div>
        <Link to={"/"}>
          <h1 className="font-black tracking-wide text-3xl text-green-500">
            MovieBoxd
          </h1>
        </Link>
      </div>

      <div className="flex gap-5">
        {/* Search */}
        <label className="input">
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
          <button className="btn btn-base-300">Log In</button>
          <div className="divider divider-horizontal"></div>
          <button className="btn btn-base-300">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
