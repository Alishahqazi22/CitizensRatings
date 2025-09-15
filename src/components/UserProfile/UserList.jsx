import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserFilterBar from "./UserFilterBar";
import leaderData from "../../Context/leaderData.json";

console.log(leaderData);

function UserList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromLink = queryParams.get("category");

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Initial load
  useEffect(() => {
    let users = leaderData;
    if (categoryFromLink) {
      users = users.filter((u) => u.category === categoryFromLink);
    }
    setFilteredUsers(users);
  }, [categoryFromLink]);

  // Apply filters
  const handleApply = ({ searchTerm, minStars, sortOrder }) => {
    let users = leaderData;
    if (categoryFromLink)
      users = users.filter((u) => u.category === categoryFromLink);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.category.toLowerCase().includes(term)
      );
    }

    if (minStars) {
      users = users.filter(
        (u) => u.ratings.overallPerformance >= Number(minStars)
      );
    }

    if (sortOrder === "low") {
      users.sort(
        (a, b) => a.ratings.overallPerformance - b.ratings.overallPerformance
      );
    } else if (sortOrder === "high") {
      users.sort(
        (a, b) => b.ratings.overallPerformance - a.ratings.overallPerformance
      );
    }

    setFilteredUsers(users);
    setAppliedFilters({ searchTerm, minStars, sortOrder });
  };

  // Cancel filters
  const handleCancel = () => {
    let users = leaderData;
    if (categoryFromLink)
      users = users.filter((u) => u.category === categoryFromLink);
    setFilteredUsers(users);
    setAppliedFilters({});
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-28">
      {/* Filter Bar */}
      <UserFilterBar onApply={handleApply} onCancel={handleCancel} />

      {/* Users */}
      <div className="w-full max-w-4xl gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            // Calculate overall rating same as UserDetailPage
            const overallRating = user?.ratings
              ? Object.keys(user.ratings)
                  .filter((key) => key !== "overallRating")
                  .reduce((sum, key) => sum + Number(user.ratings[key]), 0) /
                (Object.keys(user.ratings).length - 1)
              : 0;

            return (
              <div
                key={user.id}
                className="relative flex border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                {/* Image container with rating badge */}
                <div className="relative w-40 h-40 rounded-md overflow-hidden">
                  <img
                    src={`/assets/Profile/${
                      user?.institutionLogo || "fallback.jpg"
                    }`}
                    alt={user?.name || "Unknown"}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating badge */}
                  <div className="flex items-center justify-center absolute top-1/2 right-1/2 translate-x-[45%] -translate-y-[45%] bg-primary/10 font-bold size-full rounded-lg shadow-lg text-sm">
                    <p className="text-white">★ {overallRating.toFixed(1)}</p>
                  </div>
                </div>

                {/* User info */}
                <div className="ml-4 flex-1">
                  <h2 className="font-bold text-lg">{user?.name || "N/A"}</h2>
                  <p className="text-sm text-gray-600">
                    {user?.position || "N/A"}
                  </p>
                  <p className="text-sm">
                    {user?.district || "N/A"}, {user?.region || "N/A"}
                  </p>
                  <p className="text-sm font-medium mt-2">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {user?.tags?.length > 0 ? (
                      user.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No tags</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No users found.
            <h2 className="text-sm text-gray-500 mb-2">
                  {appliedFilters.searchTerm &&
                    `Search: ${appliedFilters.searchTerm}`}
                  {appliedFilters.minStars &&
                    ` | Min Stars: ${appliedFilters.minStars}`}
                  {appliedFilters.sortOrder &&
                    ` | Sort: ${appliedFilters.sortOrder}`}
                </h2>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserList;
