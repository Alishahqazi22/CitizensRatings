import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-20 h-20">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-primary rounded-full"></div>

        {/* Rotating wrapper (ye ghoomega) */}
        <div className="absolute inset-0 flex -top-1 -bottom-1 justify-center items-start animate-spin-around">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
