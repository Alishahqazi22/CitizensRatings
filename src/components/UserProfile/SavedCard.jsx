import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showError } from "../../Toast/useToast";
import { MdOutlineBookmarkAdded } from "react-icons/md";

function SavedCard({ user, onUpdateSaved }) {
  const [savedIds, setSavedIds] = useState([]);

  const handleBookmark = (e, user) => {
    e.preventDefault();

    let saved = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const isSaved = saved.some((u) => u.id === user.id);

    if (isSaved) {
      saved = saved.filter((u) => u.id !== user.id);
      showError("Item Removed from Saved List!");
    } else {
      saved.push(user);
      showError("Item Added To Saved List!");
    }

    localStorage.setItem("savedUsers", JSON.stringify(saved));
    setSavedIds(saved.map((u) => u.id));

    if (onUpdateSaved) {
      onUpdateSaved(saved);
    }
  };

  return (
    <Link to={`/gh/detail/${user.category}/${user.id}`} key={user.id}>
      <div className="relative w-full min-[425px]:max-w-[52rem] mx-auto flex border rounded-lg p-2 shadow-md hover:shadow-lg transition bg-gray-50">
        
        {/* image */}
        <div className="hidden sm:block relative w-32 rounded-md overflow-hidden">
          <img
            src={user?.image || "fallback.jpg"}
            alt={user?.name || "Unknown"}
            className="w-full h-full object-cover"
          />
          <div className="text-white flex flex-col items-center justify-center absolute top-1/2 right-1/2 translate-x-[45%] -translate-y-[45%] bg-primary/10 font-extrabold size-full rounded-lg shadow-lg">
            <p className="text-sm sm:text-base">OVERALL</p>
            <p className="text-base sm:text-2xl">{user?.rating || "N/A"}</p>
            <p className="font-light text-sm sm:text-base">
              {user?.rating || "N/A"} Rating
            </p>
          </div>
        </div>

        {/* userDetails */}
        <div className="ml-6 py-4 flex-1">
          <h2 className="font-bold text-base sm:text-xl mb-4">
            {user?.name || "N/A"}
          </h2>
          <div className="flex mb-2">
            <h3 className="w-36 sm:w-40 font-bold text-sm sm:text-base text-gray-600">
              Date Of First Auth.
            </h3>
            <p className="text-sm sm:text-base">{user?.created_at || "N/A"}</p>
          </div>

          <div className="flex mb-2">
            <h3 className="w-36 sm:w-40 font-bold text-sm sm:text-base text-gray-600">
              Status
            </h3>
            <p className="text-sm sm:text-base">{user?.status || "N/A"}</p>
          </div>

          <div className="flex mb-2">
            <h3 className="w-36 sm:w-40 font-bold text-sm sm:text-base text-gray-600">
              Type
            </h3>
            <p className="text-sm sm:text-base">{user?.type || "N/A"}</p>
          </div>

          <div className="flex mb-2">
            <h3 className="w-36 sm:w-40 font-bold text-sm sm:text-base text-gray-600">
              Ownership
            </h3>
            <p className="text-sm sm:text-base">{user?.Ownership || "N/A"}</p>
          </div>

          {/* Tags */}
          <div className="flex mb-2 items-start">
            <h3 className="w-40 font-bold text-sm sm:text-base text-gray-600">
              Tags
            </h3>
            <div className="flex flex-col gap-1">
              {user?.tag?.tags?.slice(0, 3).length > 0 ? (
                user.tag.tags.slice(0, 3).map((tag, index) => (
                  <p key={index} className="text-gray-700 text-sm sm:text-base">
                    {tag}
                  </p>
                ))
              ) : (
                <p className=" text-sm sm:text-base text-gray-400">N/A</p>
              )}
            </div>
          </div>
        </div>

        {/* Bookmark */}
        <div
          title="Bookmark"
          onClick={(e) => handleBookmark(e, user)}
          className={`absolute right-0 m-1 size-10 flex justify-center items-center rounded-full cursor-pointer transition-colors duration-200 
                      ${
                        savedIds.includes(user.id)
                          ? "text-primary hover:text-gray-400 hover:bg-gray-100"
                          : "text-gray-400 hover:text-primary hover:bg-gray-100"
                      }`}
        >
          <MdOutlineBookmarkAdded size={24} />
        </div>
      </div>
    </Link>
  );
}

export default SavedCard;
