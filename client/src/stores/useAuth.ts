import { create } from "zustand";
import { persist } from "zustand/middleware";

// defining the User type representing user info
type User = {
  id: string; // Unique user ID
  email: string; // User email
  display_name?: string; // Optional display name
  created_at?: string; // Optional account creation timestamp
  avatar_url?: string; // Optional profile avatar URL
  bio?: string; // Optional user bio
};

// defining the shape of the auth state
type AuthState = {
  user: User | null; // Currently authenticated user, null if not logged in
  token: string | null; // Auth token (e.g., JWT), null if not logged in
  setAuth: (user: User, token: string) => void; // Function to set user and token
  clearAuth: () => void; // Function to clear auth state (logout)
};

// creating a Zustand store for authentication
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Initial user is null
      token: null, // Initial token is null
      setAuth: (user, token) => set({ user, token }), // Update user and token
      clearAuth: () => set({ user: null, token: null }), // Clear user and token
    }),
    {
      name: "auth-storage", // Persist state in localStorage under this key
    }
  )
);
