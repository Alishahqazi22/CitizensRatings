// ToastContainer.jsx
import React from "react";
import { ToastContainer } from "react-toastify";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName={() =>
        "relative flex p-4 min-h-16 rounded-xl shadow-lg bg-white text-gray-700 font-medium border border-gray-200"
      }
      bodyClassName={() => "flex items-center text-sm"}
      progressClassName={() => "bg-blue-500 h-1"}
      closeButton={({ closeToast }) => (
        <button
          onClick={closeToast}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    />
  );
};

export default CustomToastContainer;
