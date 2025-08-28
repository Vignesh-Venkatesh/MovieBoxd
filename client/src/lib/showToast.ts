import toast from "react-hot-toast";

type ToastType = "success" | "error" | "normal" | "celebration";

const baseStyle = {
  padding: "10px 14px",
  fontSize: "0.95rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

export function showToast(type: ToastType, message: string) {
  switch (type) {
    case "success":
      toast.success(message, {
        style: {
          ...baseStyle,
          background: "#22c55e",
          color: "#fff",
        },
      });
      break;

    case "error":
      toast.error(message, {
        style: {
          ...baseStyle,
          background: "#ef4444",
          color: "#000",
        },
      });
      break;

    case "celebration":
      toast(message, {
        style: {
          ...baseStyle,
          background: "#3b82f6",
          color: "#fff",
        },
      });
      break;

    case "normal":
    default:
      toast(message, {
        style: {
          ...baseStyle,
          background: "#1f2937",
          color: "#f9fafb",
        },
      });
      break;
  }
}
