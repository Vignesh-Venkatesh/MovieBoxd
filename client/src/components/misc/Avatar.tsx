import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

type AvatarProps = {
  src?: string;
  username?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  className?: string;
};

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
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [src]);

  const finalSize = sizeMap[size] || size;

  return (
    <div
      className={`rounded-full bg-base-300 flex items-center justify-center overflow-hidden ${finalSize} ${className}`}
    >
      {isValid && src ? (
        <img
          src={src}
          alt={username}
          className="w-full h-full object-cover rounded-full"
        />
      ) : username ? (
        <span className="text-xl font-bold text-green-200">
          {username.charAt(0).toUpperCase()}
        </span>
      ) : (
        <FaUser className="text-green-200 text-sm" />
      )}
    </div>
  );
}
