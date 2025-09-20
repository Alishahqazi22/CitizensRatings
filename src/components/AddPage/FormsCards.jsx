import React from "react";
import AddIndividualsImg from "../../assets/AddPageAssets/add_individuals.jpg";
import AddInstitutionsImg from "../../assets/AddPageAssets/add_institutions.jpg";
import AddPoliciesImg from "../../assets/AddPageAssets/add_policies.jpg";
import AddOthersImg from "../../assets/AddPageAssets/add_others.jpg";
import { Link } from "react-router-dom";

function FormsCards() {

  return (
    <div className="flex flex-col bg-[#FEFEFE] h-full xl:pb-24 border-b">
      <h1 className="md:text-5xl text-2xl font-extrabold mt-10 text-center">
        Forms
      </h1>
        <div className="w-full max-w-7xl mx-auto max-[1024px]:px-10 my-10">
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 gap-6 lg:gap-8">
            <Link to="/forms/add-individuals.php">
             <div className="group relative bg-white h-[320px] mb-4 rounded-md">
                 <div className="w-full h-52 xl:h-60 overflow-hidden cursor-pointer">
                <img
                  alt="Polls & Public Opinion"
                  className="size-full object-cover hover:rounded-none transition-transform duration-300 hover:scale-125"
                  src={AddIndividualsImg}
                />
              </div>
                <p className="p-4 text-[1.4rem] font-semibold">Add Individuals</p>
             </div>
            </Link>
            <Link to="/forms/add-institutions.php">
             <div className="group relative bg-white h-[320px] mb-4 rounded-md">
                 <div className="w-full h-52 xl:h-60 overflow-hidden cursor-pointer">
                <img
                  alt="Polls & Public Opinion"
                  className="size-full object-cover hover:rounded-none transition-transform duration-300 hover:scale-125"
                  src={AddInstitutionsImg}
                />
              </div>
                <p className="p-4 text-[1.4rem] font-semibold">Add Institutions</p>
             </div>
            </Link>
            <Link to="/forms/add-policies.php">
             <div className="group relative bg-white h-[320px] mb-4 rounded-md">
                 <div className="w-full h-52 xl:h-60 overflow-hidden cursor-pointer">
                <img
                  alt="Polls & Public Opinion"
                  className="size-full object-cover hover:rounded-none transition-transform duration-300 hover:scale-125"
                  src={AddPoliciesImg}
                />
              </div>
                <p className="p-4 text-[1.4rem] font-semibold">Add Policies</p>
             </div>
            </Link>
            <Link to="/forms/add-others.php">
             <div className="group relative bg-white h-[320px] mb-4 rounded-md">
                 <div className="w-full h-52 xl:h-60 overflow-hidden cursor-pointer">
                <img
                  alt="Polls & Public Opinion"
                  className="size-full object-cover hover:rounded-none transition-transform duration-300 hover:scale-125"
                  src={AddOthersImg}
                />
              </div>    
                <p className="p-4 text-[1.4rem] font-semibold">Add Others</p>
                {/* <div className="uppercase absolute bottom-3 left-16 group-hover:scale-110 transition-all duration-300 text-white text-4xl font-bold z-10">
                  Add Others
                </div> */}
             </div>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default FormsCards;
