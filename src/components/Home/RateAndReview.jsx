import React from "react";
import { RateAndReviewProfiles } from "../../Context/Index";

function RateAndReview() {
  return (
    <div className="flex flex-col">
      <h1 className="md:text-5xl text-2xl font-extrabold my-10 text-center">
        Rate And Review Everthing You Care About
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4 px-6 lg:px-8 gap-6 lg:gap-8">
          {RateAndReviewProfiles.map((card, index) => (
            <div
              key={index}
              class=" group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer"
            >
              {/* <div className="absolute inset-0 bg-[#3989A4] bg-opacity-70"></div> */}
              <img
                alt="Polls & Public Opinion"
                class="size-full object-cover brightness-75"
                src={card.value}
              />
              <div class="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RateAndReview;
