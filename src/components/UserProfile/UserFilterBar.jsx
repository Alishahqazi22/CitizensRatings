// src/components/UserProfile/UserFilterBar.jsx
import React, { useState } from "react";

function UserFilterBar({ onApply, onCancel }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minStars, setMinStars] = useState(""); // e.g., 1-5
  const [sortOrder, setSortOrder] = useState(""); // "low" or "high"

  const handleApply = () => {
    onApply({ searchTerm, minStars, sortOrder });
  };

  const handleCancel = () => {
    setSearchTerm("");
    setMinStars("");
    setSortOrder("");
    onCancel();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-end mb-4">
      
      {/* 1. Search Bar */}
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 2. Star Rating Dropdown */}
      <div>
        <label className="text-sm font-medium">Minimum Star</label>
        <select
          value={minStars}
          onChange={(e) => setMinStars(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select stars</option>
          {[1,2,3,4,5].map((star) => (
            <option key={star} value={star}>{star} ★</option>
          ))}
        </select>
      </div>

      {/* 3. Low/High Rated Dropdown */}
      <div>
        <label className="text-sm font-medium">Sort By Rating</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select order</option>
          <option value="low">Low Rated</option>
          <option value="high">High Rated</option>
        </select>
      </div>

      {/* 4. Cancel / Apply Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCancel}
          className="w-1/2 bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="w-1/2 bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default UserFilterBar;
