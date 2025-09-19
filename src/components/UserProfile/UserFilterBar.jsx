// src/components/UserProfile/UserFilterBar.jsx
import React, { useState } from "react";

function UserFilterBar({ onApply, onCancel, onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minStars, setMinStars] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleApply = () => {
    onApply({ searchTerm, minStars, sortOrder });
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinStars("");
    setSortOrder("");
    onCancel();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-7 items-end mb-4">
      {/* Search Bar */}
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search anythings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearchChange(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-primary shadow"
        />
      </div>

      {/* Star Rating Dropdown */}
      <div>
        <label className="text-sm font-medium">Star Rating</label>
        <select
          value={minStars}
          onChange={(e) => {
            setMinStars(e.target.value);
            onSearchChange(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-1 focus:ring-primary shadow"
        >
          <option value="">Select star</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} {star === 1 ? "Star" : "Stars"}
            </option>
          ))}
        </select>
      </div>

      {/* Low/High Rated Dropdown */}
      <div>
        <label className="text-sm font-medium">Sort</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary shadow"
        >
          <option value="">Sort by</option>
          <option value="low">Low Rated</option>
          <option value="high">High Rated</option>
        </select>
      </div>

      {/* Reset / Apply Buttons */}
      <div className="flex gap-2 text-sm mb-1">
        <button
          onClick={handleReset}
          className="w-1/2 p-2 bg-gray-300 text-gray-700 rounded"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="w-1/2 bg-primary p-2 text-white rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default UserFilterBar;
