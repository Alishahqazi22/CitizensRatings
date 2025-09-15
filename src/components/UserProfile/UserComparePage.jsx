import React, { useState } from "react";
import { useParams } from "react-router-dom";
import leaderData from "../../Context/leaderData.json";
import { FaStar } from "react-icons/fa";
import Chart from "react-apexcharts";
import QuestionChart from "../Charts/QuestionChart";

// const colors = ["bg-orange-500", "bg-green-400", "bg-yellow-400"];
const textColors = ["text-orange-500", "text-green-500", "text-yellow-400"];

const renderStars = (rating, textColorClass) => {
  const totalStars = 5;
  return [...Array(totalStars)].map((_, i) => (
    <FaStar key={i} className={i < rating ? textColorClass : "text-gray-300"} />
  ));
};

function UserComparePage() {
  const { id, category } = useParams();

  const user1 = leaderData.find(
    (item) => item.id === Number(id) && item.category === category
  );

  const [search2, setSearch2] = useState("");
  const [user2, setUser2] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (value) => {
    setSearch2(value);

    if (value.length > 0) {
      const matches = leaderData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectUser = (user) => {
    setUser2(user);
    setSearch2(user.name);
    setSuggestions([]);
  };

  const renderUserCard = (leader) => {
    if (!leader) {
      return (
        <div className="flex justify-center items-center h-full text-gray-400 italic">
          Select a user to compare
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex flex-col items-center">
          <div className="w-full h-40 rounded-md overflow-hidden shadow">
            <img
              src={leader.institutionLogo}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-4xl font-bold mt-4 bg-yellow-400 px-4 py-2 rounded">
            {leader.ratings.overallRating}
          </p>
          <h3 className="mt-1 font-light">Overall Rating</h3>
        </div>

        <ul className="grid grid-cols-2 gap-4 mt-6">
          {Object.entries(leader.ratings)
            .filter(([key]) => key !== "overallRating")
            .map(([key, value], index) => {
              const randomColor = textColors[index % textColors.length];
              return (
                <li key={key} className="text-sm font-semibold pb-1">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="flex text-2xl">
                    {renderStars(Math.round(Number(value)), randomColor)}
                  </span>
                </li>
              );
            })}
        </ul>

        <h2 className="text-lg font-bold mt-6">Tags</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {leader.tags?.length > 0 ? (
            leader.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 text-sm font-light rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-gray-400 italic">No tags available</p>
          )}
        </div>
        <ul className="mt-4 space-y-3">
          {leader.questions?.map((q, idx) => {
            const [key, value] = Object.entries(q)[0];

            return (
              <li key={idx} className="bg-white px-3 py-1 font-bold rounded flex flex-col border-b pb-2">
                <h3 className="capitalize text-gray-700 font-bold">
                  {key.replace(/([A-Z])/g, " $1")}?
                </h3>
                <QuestionChart answer={value} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 mt-28">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="grid grid-cols-3 text-center font-bold text-3xl">
          <h1>{user1?.name || "User 1"}</h1>
          <div className="bg-primary mx-[11.2rem] rounded-full flex justify-center items-center">
            <h1 className="text-white text-xl">VS</h1>
          </div>
          <h1>{user2?.name || "User 2"}</h1>
        </div>

        <div className="flex justify-center my-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Enter undefined name"
              value={search2}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border text-center p-2 rounded w-96 focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-48 overflow-y-auto shadow">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectUser(s)}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <div className="max-w-7xl mx-auto bg-gray-50 shadow-xl rounded-lg p-8">
            {renderUserCard(user1)}
          </div>
          <div className="max-w-7xl mx-auto bg-gray-50 shadow-xl rounded-lg p-8">
            {renderUserCard(user2)}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UserComparePage;
