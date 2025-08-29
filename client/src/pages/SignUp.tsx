import { useState } from "react";
import Avatar from "../components/misc/Avatar";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";

export default function Signup() {
  document.title = "Sign Up | MovieBoxd";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-google">
      <AppToaster />
      <div className="card w-96 shadow-xl bg-base-100 p-6">
        <div className="flex justify-center mb-4">
          <Avatar src={avatarUrl} username={username} size="md" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Avatar URL (optional)"
            className="input input-bordered w-full"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <textarea
            placeholder="Bio (optional)"
            className="textarea textarea-bordered w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-black w-full"
          >
            Sign Up
          </button>
        </form>

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
