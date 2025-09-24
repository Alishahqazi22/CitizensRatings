import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";

function Poll() {
  const [poll, setPoll] = useState([]);

  async function getPoll() {
    try {
      const response = await axiosInstance.get("/poll");
      const apiCategories = response?.data?.data || [];
      setPoll(apiCategories || []);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getPoll();
  }, []);

  const pollsCount = poll.length;
  
  return (
    <div className="mt-28">
      <div className="max-w-5xl mx-auto">
        <h1 className="py-10 px-6 text-3xl font-semibold">
          {pollsCount} Poll{pollsCount > 1 ? "s" : ""} Found
        </h1>

        <div className="border-t border-black">
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[2560px]:grid-cols-4 gap-6 lg:gap-8">
            {poll.map((poll) => (
              <Link key={poll.id} to={`/gh/poll/${poll.id}`}>
                <div className="group relative w-80 h-48 md:mx-6 my-10 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer">
                  <img
                    alt={poll.name}
                    className="size-full object-cover brightness-75"
                    src={poll.image}
                  />
                  <div className="uppercase absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                    {poll.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
