    // useToast.js
import { toast } from "react-toastify";

// Success Toast
export const showSuccess = (message) =>
  toast.success(message, {
    className: "bg-green-500 text-white border border-green-600",
    bodyClassName: "text-white",
    progressClassName: "bg-white",
  });

// Error Toast
export const showError = (message) =>
  toast.error(message, {
    className: "bg-red-500 text-white border border-red-600",
    bodyClassName: "text-white",
    progressClassName: "bg-white",
  });

// Info Toast
export const showInfo = (message) =>
  toast.info(message, {
    className: "bg-blue-500 text-white border border-blue-600",
    bodyClassName: "text-white",
    progressClassName: "bg-white",
  });

// Warning Toast
export const showWarning = (message) =>
  toast.warning(message, {
    className: "bg-yellow-500 text-black border border-yellow-600",
    bodyClassName: "text-black",
    progressClassName: "bg-black",
  });
