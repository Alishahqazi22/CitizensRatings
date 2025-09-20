// src/components/UserProfile/UserList.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserFilterBar from "./UserFilterBar";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { showError } from "../../Toast/useToast";
import { axiosInstance } from "../../Config/axiosInstance";

function UserList() {
  const { category } = useParams();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBookmark = (e) => {
    e.preventDefault();
    if (!bookmarked) {
      showError("Item Added To Saved List!");
    } else {
      showError("Item Removed from Saved List!");
    }
    setBookmarked(!bookmarked);
  };

  // 🔹 API Call
  async function fetchUsers() {
    try {
      const response = await axiosInstance.get("/category");
      const apiData = response?.data?.data || [];
      let users = apiData;

      if (category) {
        users = users.filter((u) => u.type === category);
      }

      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [category]);

  const handleApply = (newFilters) => {
    const updatedFilters = { ...appliedFilters, ...newFilters };

    let users = filteredUsers;

    // 🔹 Search filter
    if (updatedFilters.searchTerm) {
      const term = updatedFilters.searchTerm.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          (u.category_details?.[0]?.name || "").toLowerCase().includes(term)
      );
    }

    // 🔹 Sorting
    if (updatedFilters.sortOrder === "low") {
      users.sort((a, b) => a.id - b.id);
    } else if (updatedFilters.sortOrder === "high") {
      users.sort((a, b) => b.id - a.id);
    }

    setFilteredUsers(users);
    setAppliedFilters(updatedFilters);
  };

  const handleCancel = () => {
    fetchUsers();
    setAppliedFilters({});
  };

  return (
    <div className="max-w-[59rem] mx-auto p-4 mt-36">
      <UserFilterBar
        onApply={handleApply}
        onCancel={handleCancel}
        onSearchChange={(term) => handleApply({ searchTerm: term })}
      />

      <h1 className="border-b border-black pb-4 mx-2 px-8 text-3xl font-semibold my-6">
        <span>{filteredUsers.length} </span>
        {category ? category : "All Users"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6 mt-14">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link to={`/detail/${user.type}/${user.id}`} key={user.id}>
                <div className="relative max-w-[52rem] mx-auto flex border rounded-lg p-2 shadow-md hover:shadow-lg transition bg-gray-50">
                  <div className="relative w-32 rounded-md overflow-hidden">
                    <img
                      src={user?.image || "fallback.jpg"}
                      alt={user?.name || "Unknown"}
                      className="w-full h-full object-cover"
                    />
                    <div className="text-white flex flex-col items-center justify-center absolute top-1/2 right-1/2 translate-x-[45%] -translate-y-[45%] bg-primary/10 font-extrabold size-full rounded-lg shadow-lg">
                      <p>OVERALL</p>
                      <p className="text-2xl">{user?.rating || "N/A"}</p>
                      <p className="font-light">
                        {user?.rating || "N/A"} Rating
                      </p>
                    </div>
                  </div>

                  <div className="ml-6 py-4 flex-1">
                    <h2 className="font-bold text-xl">{user?.name || "N/A"}</h2>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-600">Created At</h3>
                      <p>{user?.created_at || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-600">Type</h3>
                      <p>{user?.type || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-600">Tags</h3>
                      <p>{user?.tags?.slice(0, 3).join(", ") || "N/A"}</p>
                    </div>
                  </div>
                  <div
                    title="BookMark"
                    onClick={handleBookmark}
                    className="m-1 size-10 flex justify-center items-center text-gray-400 hover:text-primary hover:bg-gray-100 cursor-default rounded-full transition-colors duration-200"
                  >
                    <MdOutlineBookmarkAdded size={24} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center col-span-full text-gray-500">
              <p>No users found.</p>
              {appliedFilters.searchTerm && (
                <p className="text-sm text-gray-500 mb-2">
                  Search: {appliedFilters.searchTerm}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col justify-center items-center my-4 space-y-3">
        <h1 className="text-xl font-bold">
          Don't see what you're looking for?
        </h1>
        <Link
          to="/addpage.php"
          target="_blank"
        >
          <button className="py-2 px-3 text-2xl rounded bg-primary text-white">
            Click to Add
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserList;
