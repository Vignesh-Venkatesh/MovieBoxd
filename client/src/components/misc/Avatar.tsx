import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

type AvatarProps = {
  src?: string; // URL of the avatar image
  username?: string; // Used to show initial if image fails
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string; // size of avatar
  className?: string; // additional custom classes
};

// Map predefined sizes to Tailwind width/height classes
const sizeMap: Record<string, string> = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  "2xl": "w-40 h-40",
};

export default function Avatar({
  src,
  username,
  size = "md",
  className,
}: AvatarProps) {
  const [isValid, setIsValid] = useState(true); // Track if image loads correctly

  // Check if the image URL is valid
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsValid(true); // valid image
    img.onerror = () => setIsValid(false); // fallback if image fails
  }, [src]);

  const finalSize = sizeMap[size] || size; // use mapped size or custom size string

  return (
    // Container: rounded, flex-centered, overflow hidden
    <div
      className={`rounded-full bg-base-300 flex items-center justify-center overflow-hidden ${finalSize} ${className}`}
    >
      {isValid && src ? (
        // Render image if valid
        <img
          src={src}
          alt={username}
          className="w-full h-full object-cover rounded-full"
        />
      ) : username ? (
        // Fallback: first letter of username
        <span className="text-xl font-bold text-green-200">
          {username.charAt(0).toUpperCase()}
        </span>
      ) : (
        // Fallback: generic user icon
        <FaUser className="text-green-200 text-sm" />
      )}
    </div>
  );
}
