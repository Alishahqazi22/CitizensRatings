import React from "react";
import { Link } from "react-router-dom";

function RateCourse() {
  return (
    <div className="py-24 border-b bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex max-[426px]:flex-col max-[426px]:gap-10 items-center sm:justify-between w-full">
          <h1 className="text-2xl lg:text-4xl font-bold w-full sm:w-[55%] leading-normal">
            A+ or F? Know Before You Enroll. The Class May Be Required—But the
            Professor is Up to You.
          </h1>
          <Link to="/apply.php">
            <button className="btn-secondary text-lg font-semibold text-white bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary py-4 px-10 max-[768px]:w-full">
              Rate a Course now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RateCourse;
