import React from "react";
import abImg from "../../assets/AddPageAssets/ab2.jpg";

function RateSchool() {
  return (
    <div className="py-2 border-y bg=[#FEFEFE]">
      <div className="my-2 w-full flex">
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center px-24">
          <div className="text-start space-y-2">
            <h3 className="text-lg text-red-500 font-bold tracking-wide">
              Don’t Just Register. Research
            </h3>
            <h3 className="text-4xl font-bold leading-snug pb-10">
              Trust the Students Who’ve Been There.
            </h3>
            <button className="btn-secondary text-lg font-semibold text-black bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary py-4 px-10 w-full">
              Rate a School now!
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src={abImg} alt="" className="bg-cover size-full" />
        </div>
      </div>
    </div>
  );
}

export default RateSchool;
