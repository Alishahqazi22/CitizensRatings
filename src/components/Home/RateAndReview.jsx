import React from "react";
import PollsPublic from "../../assets/HomeAssets/PollsPublic.jpg";
import { Link } from "react-router-dom";
import leaderData from "../../Context/leaderData.json";
import { categoryImages } from "../../Context/Index";

function RateAndReview() {
  const categories = [...new Set(leaderData.map((item) => item.category))];

  const normalizeCategory = (category) => {
    return category.replace(/\s*\(.*?\)\s*/g, "").trim();
  };

  return (
    <div className="flex flex-col">
      <h1 className="md:text-5xl text-2xl font-extrabold mt-10 text-center">
        Rate And Review Everything You Care About
      </h1>
      <div className="max-w-7xl mx-auto my-10">
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6 lg:gap-8">
          <Link to="/poll">
            <div className="group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer">
              <img
                alt="Polls & Public Opinion"
                className="size-full object-cover brightness-75"
                src={PollsPublic}
              />
              <div className="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                Polls & Public Opinion
              </div>
            </div>
          </Link>

          {categories.map((category, index) => {
            const normalized = normalizeCategory(category);

            return (
              <div
                key={index}
                className="group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer"
              >
                {/* <Link to={`/users?category=${encodeURIComponent(category)}`}> */}
                  <img
                    alt={category}
                    className="size-full object-cover brightness-75"
                    src={categoryImages[normalized] || "/fallback.jpg"}
                  />
                {/* </Link> */}
                <div className="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                  {category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RateAndReview;
