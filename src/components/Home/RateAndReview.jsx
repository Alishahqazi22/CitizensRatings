import { useEffect, useState } from "react";
import PollsPublic from "../../assets/HomeAssets/PollsPublic.jpg";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";

function RateAndReview() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategory() {
    try {
      const response = await axiosInstance.get("/category");
      const apiCategories = response?.data?.data || [];
      // console.log("rate and review" ,response?.data?.data);
      setCategories(apiCategories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="md:text-5xl text-2xl font-extrabold mt-10 text-center">
        Rate And Review Everything You Care About
      </h1>
      {loading ? (
        <div className="flex items-center">
          {/* <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div> */}
          <p className="text-lg font-medium">Loading images...</p>
        </div>
      ) : (
        <div className="max-w-7xl px-14 lg:px-0 md:mx-auto my-10">
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6 lg:gap-8">
            <Link to="/gh/poll">
              <div className="group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer">
                <img
                  alt="Polls & Public Opinion"
                  className="size-full object-cover brightness-75"
                  src={PollsPublic}
                />
                <div className="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                  Polls & Public Opinion
                </div>
              </div>
            </Link>

            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="group relative w-full h-48 overflow-hidden rounded-md hover:rounded-none transition-transform duration-300 hover:scale-95 cursor-pointer"
                >
                  <Link to={`/gh/users/${category.name}`}>
                    <img
                      alt={category.name}
                      className="size-full object-cover brightness-75"
                      src={category.image}
                    />
                  </Link>
                  <div className="absolute bottom-3 left-3 group-hover:left-1 transition-all duration-300 text-white text-lg font-semibold z-10">
                    {category.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RateAndReview;
