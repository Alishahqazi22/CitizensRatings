import React from "react";
import abImg from "../../assets/AddPageAssets/ab2.jpg";
import { Link } from "react-router-dom";

function RateSchool() {
  return (
    <div className="py-2 border-y bg-[#FEFEFE]">
      <div className="my-2 w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full bg-gray-50 flex flex-col justify-center max-[768px]:py-10 px-4 lg:px-24">
          <div className="text-start space-y-2">
            <h3 className="text-lg text-red-500 font-bold tracking-wide">
              Don’t Just Register. Research
            </h3>
            <h3 className="text-4xl font-bold leading-snug pb-10">
              Trust the Students Who’ve Been There.
            </h3>
            <Link to="/apply.php">
              <button className="btn-secondary text-lg font-semibold text-black bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary py-4 px-10 w-full">
                Rate a School now!
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <img src={abImg} alt="" className="bg-cover size-full" />
        </div>
      </div>
    </div>
  );
}

export default RateSchool;
