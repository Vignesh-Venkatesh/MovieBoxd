// React and state management
import { useState } from "react";
// Components
import Avatar from "../components/misc/Avatar"; // displays user avatar
import AppToaster from "../components/misc/Toaster"; // notification toaster
import { showToast } from "../lib/showToast"; // helper to show notifications
import axios from "axios"; // HTTP requests

// Backend API URL
const URL = import.meta.env.VITE_BACKEND_URL;

export default function Signup() {
  // Set the page title
  document.title = "Sign Up | MovieBoxd";

  // Form state
  const [username, setUsername] = useState(""); // user's display name
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [confirmPassword, setConfirmPassword] = useState(""); // confirm password
  const [avatarUrl, setAvatarUrl] = useState(""); // optional avatar image URL
  const [bio, setBio] = useState(""); // optional user bio

  // Axios instance for API calls
  const api = axios.create({
    baseURL: URL,
    headers: { "Content-Type": "application/json" },
  });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    try {
      // Send signup request to backend
      await api.post("/auth/signup", {
        email,
        password,
        display_name: username,
        avatar_url: avatarUrl,
        bio,
      });

      // Show success notification
      showToast("success", "Account created! Please log in.");
      window.location.href = "/login"; // redirect to login page
    } catch (err: any) {
      // Show error if signup fails
      showToast("error", err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-google">
      {/* Notification toaster */}
      <AppToaster />

      {/* Signup card */}
      <div className="card w-96 shadow-xl bg-base-100 p-6">
        {/* Avatar preview */}
        <div className="flex justify-center mb-4">
          <Avatar src={avatarUrl} username={username} size="md" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Signup form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm password input */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Optional Avatar URL input */}
          <input
            type="url"
            placeholder="Avatar URL (optional)"
            className="input input-bordered w-full"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />

          {/* Optional Bio textarea */}
          <textarea
            placeholder="Bio (optional)"
            className="textarea textarea-bordered w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          {/* Submit button */}
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-black w-full"
          >
            Sign Up
          </button>
        </form>

        {/* Link to login page */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
