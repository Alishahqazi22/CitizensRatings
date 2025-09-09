import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

function HeroSection() {
  const [value, setValue] = useState("");
  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center">
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn2.allevents.in/transup/90/b744a057ac42349b23a0e6534da9ae/Rectangle-293.webp')",
        }}
      >
        <div className="relative z-10 flex flex-col space-y-5 items-center bg-black/50 justify-center h-full text-white">
          <h1 className="text-2xl md:text-5xl font-bold">
            Opinions That Shape the World.
          </h1>
          <h3 className="text-2xl">
            Your Guide to What’s Good, Bad, and Must-Avoid
          </h3>
          <div className="md:w-[50%] w-[90%]">
            <div className="w-full bg-white rounded-full border border-none overflow-hidden mt-5">
              <div className="relative flex items-center">
                <button className="flex items-center gap-2 md:px-4 px-3 py-3 md:py-4 text-black hover:bg-gray-50 transition border-r border-gray-200 font-thin">
                  Select Cetagories
                  <MdKeyboardArrowDown className="text-gray-500" />
                </button>
                <input
                  placeholder="Search for Officials and Institutions..."
                  className="flex-1 bg-white outline-none border-none text-gray-500 md:px-4 px-3 py-3 md:py-4"
                  type="text"
                  name="searchBar"
                  value={value}
                  onChange={(e) => setValue(e.target.value, console.log(value))}
                />
                <button className="bg-primary text-white md:px-6 md:py-4 py-3 px-4 hover:bg-[#0088BB] transition">
                  <BiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl">
            Make Smarter Choices with Real Ratings
          </h3>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
