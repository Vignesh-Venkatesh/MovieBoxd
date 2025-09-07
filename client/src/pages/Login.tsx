import { useState } from "react";
import { useAuth } from "../stores/useAuth"; // Zustand store for auth
import AppToaster from "../components/misc/Toaster"; // Toast notifications
import { showToast } from "../lib/showToast"; // Toast helper
import axios from "axios";

// Backend URL from environment variables
const URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  // Set the page title
  document.title = "Login | MovieBoxd";

  // Zustand setter for updating auth state
  const setAuth = useAuth((s) => s.setAuth);

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Axios instance with JSON headers
  const api = axios.create({
    baseURL: URL,
    headers: { "Content-Type": "application/json" },
  });

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Login request
      const res = await api.post("/auth/login", { email, password });
      const { session } = res.data;

      // Extract token from session
      const token = session.access_token;

      // Fetch logged-in user info from /me endpoint
      const meRes = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = meRes.data;

      // Store user info and token in Zustand store
      setAuth(user, token);

      // Show success toast
      showToast("success", "Logged in!");

      // Redirect to homepage
      window.location.href = "/";
    } catch (err: any) {
      // Handle banned user error
      if (err.response?.data?.error?.code === "user_banned") {
        showToast("error", "You have been banned");
      } else {
        // Handle other login errors
        showToast("error", err.response?.data?.msg || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-google">
      {/* Toast container */}
      <AppToaster />

      {/* Login card */}
      <div className="card w-96 shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Login form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          {/* Submit button */}
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-black w-full"
          >
            Login
          </button>
        </form>

        {/* Signup redirect link */}
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
