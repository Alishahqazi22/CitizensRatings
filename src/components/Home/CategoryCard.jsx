import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";
import image from "../../assets/CategoryAssets/Page-1751828351-1358149898.jpg"

function CategoryCard({ title, apiUrl, linkTo, fallbackImg }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await axiosInstance.get(apiUrl);
      setData(response?.data?.data || null);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer"
    >
      <Link to={linkTo}>
        {loading ? (
          <div className="flex justify-center items-center h-full bg-gray-200">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : (
          <img
            alt={title}
            className="size-full object-cover brightness-75"
            src={image || fallbackImg || "fallback.jpg"}
          />
        )}
      </Link>
      <div className="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
        {title}
      </div>
    </div>
  );
}

export default CategoryCard;
