import React from "react";

function AddPageHeroSection({ title }) {
  return (
    <div className="relative w-full h-[350px] flex flex-col items-center justify-center">
      <div
        className="relative w-full h-screen bg-cover bg-end"
        style={{
          backgroundImage:
            "url('https://www.about.citizensratings.com/assets2/images/banner3.jpg')",
        }}
      >
        <div className="relative z-10 flex flex-col space-y-5 px-10 md:px-20 lg:px-44 py-[5.4rem] justify-end bg-black/50 h-full text-white">
          <h1 className="text-2xl md:text-[2.55rem] font-bold">{title}</h1>
          <h3 className="text-[1.2rem] text-gray-300">
            CitizensRatings.com — The voice of the people, made louder.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AddPageHeroSection;
