import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import leaderData from "../../Context/leaderData.json";

function HeroSection() {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const categories = [...new Set(leaderData.map((item) => item.category))];

  const handleCategorySelect = (cat) => {
    setValue(cat);
    setShowDropdown(false);
    setShowSuggestions(false);
    navigate(`/users/${cat}`);
  };

  const handleSearch = () => {
    if (!value.trim()) return;
    const matched = categories.find(
      (cat) => cat.toLowerCase() === value.trim().toLowerCase()
    );
    if (matched) {
      navigate(`/users/${matched}`);
    } else {
      alert("Category not found!");
    }
  };

  const filteredSuggestions = categories.filter((cat) =>
    cat.toLowerCase().includes(value.toLowerCase())
  );

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

          <div className="md:w-[50%] w-[90%] relative">
            <div className="w-full bg-white rounded-full border border-none mt-5">
              <div className="relative flex items-center">
                  <button
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                      setShowSuggestions(false); 
                    }}
                    className="flex items-center gap-2 md:px-4 px-3 py-3 md:py-4 text-black hover:bg-gray-50 rounded-l-full transition border-r border-gray-200 font-thin"
                  >
                    Select Categories
                    {!showDropdown ? (
                      <MdKeyboardArrowDown className="text-gray-500" />
                    ) : (
                      <MdKeyboardArrowDown className="text-gray-500 rotate-180" />
                    )}
                  </button>

                  {showDropdown && (
                    <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md z-20 w-full max-h-60 overflow-y-auto">
                      {categories.map((cat, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleCategorySelect(cat)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}

                <div className="flex-1">
                  <input
                    placeholder="Search for Officials and Institutions..."
                    className="w-full bg-white outline-none border-none rounded-full text-gray-500 md:px-4 px-3 py-3 md:py-4"
                    type="text"
                    name="searchBar"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setShowSuggestions(true);
                      setShowDropdown(false); 
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />

                  {showSuggestions && value.trim() !== "" && (
                    <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md z-50 w-full max-h-60 overflow-y-auto">
                      <p className="px-4 py-2 cursor-default text-black text-xs font-semibold uppercase">Select Category</p>
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((cat, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleCategorySelect(cat)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          >
                            {cat}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          No results found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSearch}
                  className="absolute -right-1 rounded-r-full bg-primary text-white md:px-6 md:py-4 py-3 px-4 hover:bg-[#0088BB] transition"
                >
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
