import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import QuestionChart from "../Charts/QuestionChart";
import { axiosInstance } from "../../Config/axiosInstance";

const textColors = ["text-orange-500", "text-green-500", "text-yellow-400"];

const renderStars = (rating, textColorClass) => {
  const totalStars = 5;
  return [...Array(totalStars)].map((_, i) => (
    <FaStar key={i} className={i < rating ? textColorClass : "text-gray-300"} />
  ));
};

const calculateOverallRating = (ratings) => {
  if (!ratings) return "0.0";
  const ratingKeys = Object.keys(ratings).filter(
    (key) => key !== "overallRating"
  );
  const total = ratingKeys.reduce((sum, key) => sum + Number(ratings[key]), 0);
  return (total / ratingKeys.length).toFixed(1);
};

function UserComparePage() {
  const { id, category } = useParams();

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [search2, setSearch2] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allLeaders, setAllLeaders] = useState([]);

  async function getUser1() {
    try {
      let response;
      if (category === "public_service") {
        response = await axiosInstance.get(`/public_service/${id}`);
      } else if (category === "executive") {
        response = await axiosInstance.get(`/executive/${id}`);
      } else if (category === "public_opinion") {
        response = await axiosInstance.get(`/public_opinion/${id}`);
      } else {
        response = await axiosInstance.get(`/category/${id}`);
      }
      setUser1(response?.data?.category || null);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllLeaders() {
    try {
      const res = await axiosInstance.get("/category");
      console.log(res.data.data);
      setAllLeaders(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser1();
    getAllLeaders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, category]);

  const handleSearchChange = (value) => {
    setSearch2(value);
    if (value.length > 0) {
      const matches = allLeaders.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectUser = async (user) => {
    try {
      let response;
      if (user.category === "public_service") {
        response = await axiosInstance.get(`/public_service/${user.id}`);
      } else if (user.category === "executive") {
        response = await axiosInstance.get(`/executive/${user.id}`);
      } else if (user.category === "public_opinion") {
        response = await axiosInstance.get(`/public_opinion/${user.id}`);
      } else {
        response = await axiosInstance.get(`/category/${user.id}`);
      }
      setUser2(response?.data?.category || null);
      setSearch2(user.name);
      setSuggestions([]);
    } catch (error) {
      console.log(error);
    }
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
       
       {/* image */}
        <div className="flex flex-col items-center">
          <div className="w-full h-40 rounded-md overflow-hidden shadow">
            <img
              src={leader.image || leader.institutionLogo}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-4xl font-bold mt-4 bg-yellow-400 px-4 py-2 rounded">
            {calculateOverallRating(leader.ratings)}
          </p>
          <h3 className="mt-1 font-light">Overall Rating</h3>
        </div>

        {/* Ratings */}
        <ul className="grid grid-cols-2 gap-4 mt-6">
          {leader.ratings &&
            Object.entries(leader.ratings)
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

        {/* Tags */}
        <h2 className="text-lg font-bold mt-6">Tags</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {leader.tag?.tags?.length > 0 ? (
            leader.tag.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 lg:text-sm font-light rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-gray-400 italic">No tags available</p>
          )}
        </div>

        {/* Questions */}
        <ul className="mt-4 space-y-3">
          {leader.questions?.map((q, idx) => (
            <li
              key={idx}
              className="bg-white px-3 py-1 font-bold rounded flex flex-col border-b pb-2"
            >
              <h3 className="capitalize text-gray-700 font-bold">
                {q.question}
              </h3>
              <QuestionChart answer={q.answer} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 mt-28">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        
        {/* Header */}
        <div className="md:grid grid-cols-3 text-center font-bold lg:text-3xl">
          <h1>{user1?.name || "User 1"}</h1>
          <div className="bg-primary mx-[6rem] lg:mx-[11rem] my-4 rounded-full flex justify-center items-center">
            <h1 className="text-white text-sm lg:text-xl">VS</h1>
          </div>
          <h1>{user2?.name || "User 2"}</h1>
        </div>

        {/* Search */}
        <div className="flex justify-center my-6">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Enter user name"
              value={search2}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border text-center p-2 rounded w-full md:w-96 focus:outline-none"
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

        {/* Compare Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8">
          
          {/* user01 */}
          <div className="w-full bg-gray-50 shadow-xl rounded-lg p-4 md:p-8">
            {renderUserCard(user1)}
          </div>

          {/* user02 */}
            <h1 className="block md:hidden text-center font-bold lg:text-3xl md:pt-8">{user2?.name || "User 2"}</h1>
          <div className="w-full bg-gray-50 shadow-xl rounded-lg p-4 md:p-8">
            {renderUserCard(user2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComparePage;
