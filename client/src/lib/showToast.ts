import toast from "react-hot-toast";

// defining possible toast types
type ToastType = "success" | "error" | "normal" | "celebration";

// base style applied to all toast messages
const baseStyle = {
  padding: "10px 14px", // Padding inside the toast
  fontSize: "0.95rem", // Font size of message
  fontWeight: 600, // Slightly bold text
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)", // Drop shadow for a floating effect
};

/**
 * Show a toast notification
 * type - Type of toast (success, error, normal, celebration)
 * message - Message to display inside the toast
 */
export function showToast(type: ToastType, message: string) {
  switch (type) {
    case "success":
      // showing a green success toast
      toast.success(message, {
        style: {
          ...baseStyle,
          background: "#22c55e", // Green background
          color: "#fff", // White text
        },
      });
      break;

    case "error":
      // showing a red error toast
      toast.error(message, {
        style: {
          ...baseStyle,
          background: "#ef4444", // Red background
          color: "#000", // Black text
        },
      });
      break;

    case "celebration":
      // showing a blue celebration toast
      toast(message, {
        style: {
          ...baseStyle,
          background: "#3b82f6", // Blue background
          color: "#fff", // White text
        },
      });
      break;

    case "normal":
    default:
      // showing a dark normal toast (default)
      toast(message, {
        style: {
          ...baseStyle,
          background: "#1f2937", // Dark background
          color: "#f9fafb", // Light text
        },
      });
      break;
  }
}
