import React, { useEffect, useRef, useState } from "react";

function UserFilterBar({ onApply, onCancel, onSearchChange, searchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minStars, setMinStars] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
   const dropdownRef = useRef(null);
  
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

  const handleApply = () => {
    onApply({ searchTerm, minStars, sortOrder });
    setShowDropdown(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinStars("");
    setSortOrder("");
    onCancel();
    setShowDropdown(false);
  };
  

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-7 items-end mb-4 relative">
     
      {/* Search Bar */}
      <div className="relative" ref={dropdownRef}>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            onSearchChange(value);
            setShowDropdown(value.length > 0);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-primary shadow"
        />

        {/* Search Suggestions Dropdown */}
        {showDropdown && (
          <div className="absolute z-50 bg-white border shadow-md w-full mt-1 rounded-b-md max-h-60 overflow-y-auto">
            <div
              onClick={() => {
                setSearchTerm("All Users");
                onSearchChange(""); 
                setShowDropdown(false);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100 font-semibold text-primary border-b"
            >
              All Users
            </div>

            {searchResults?.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSearchTerm(user.name);
                    onSearchChange(user.name);
                    setShowDropdown(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {user.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results</div>
            )}
          </div>
        )}
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
