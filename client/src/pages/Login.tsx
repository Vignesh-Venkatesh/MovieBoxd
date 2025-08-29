import { useState } from "react";
import { useAuth } from "../stores/useAuth";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  document.title = "Login | MovieBoxd";

  const setAuth = useAuth((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = axios.create({
    baseURL: URL,
    headers: { "Content-Type": "application/json" },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // login
      const res = await api.post("/auth/login", { email, password });
      const { session } = res.data;

      // storing token temporarily
      const token = session.access_token;

      // fetching user info from /me
      const meRes = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = meRes.data;

      //setting zustand store with user info + token
      setAuth(user, token);

      showToast("success", "Logged in!");
      window.location.href = "/";
    } catch (err: any) {
      showToast("error", err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-google">
      <AppToaster />
      <div className="card w-96 shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-black w-full"
          >
            Login
          </button>
        </form>
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
