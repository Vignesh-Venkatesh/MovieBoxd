import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "../misc/Avatar";
import Title from "../misc/Title";

const URL = import.meta.env.VITE_BACKEND_URL;

// User type definition
type User = {
  id: string;
  display_name: string;
  avatar_url: string;
  created_at: string;
};

export default function LatestUsers() {
  // State for latest users
  const [users, setUsers] = useState<User[]>([]);
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest users from backend
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${URL}latest/users?limit=10`);
        setUsers(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch latest users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Skeleton loading state
  if (loading) {
    return (
      <div className="space-y-2">
        <Title title="Recently joined users" />
        <div className="skeleton h-10 rounded"></div>
        <div className="skeleton h-10 rounded"></div>
        <div className="skeleton h-10 rounded"></div>
        <div className="skeleton h-10 rounded"></div>
        <div className="skeleton h-10 rounded"></div>
      </div>
    );
  }

  // If no users found
  if (users.length === 0) {
    return (
      <div className="space-y-2">
        <Title title="Recently joined users" />
        <p className="italic text-sm opacity-50">No users found.</p>
      </div>
    );
  }

  // Render latest users list
  return (
    <div className="space-y-2 my-4">
      <Title title="Recently joined users" />

      <div className="space-y-1">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/profile/${user.display_name}`}
            className="block"
          >
            {/* User card */}
            <div className="flex items-center gap-3 bg-base-300 rounded p-3 hover:bg-base-200 border-2 border-transparent hover:border-green-500 transition-colors duration-300">
              {/* Avatar */}
              <Avatar
                src={user.avatar_url}
                username={user.display_name}
                size="sm"
              />
              {/* Username and join date */}
              <div className="flex flex-col">
                <h1 className="font-bold">{user.display_name}</h1>
                <p className="text-xs italic">
                  Joined{" "}
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
