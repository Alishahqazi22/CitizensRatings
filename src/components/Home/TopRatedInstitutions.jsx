import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi";
import profile01 from "../../assets/HomeAssets/Public-Opinion-2.jpg";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";

function TopRatedInstitutions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // const slugify = (text) => text?.toString().toLowerCase().replace(/\s+/g, "-");

  async function getInstution() {
    try {
      const response = await axiosInstance.get("/public_service");
      const apiData = response?.data?.data || [];
      // console.log("api",apiData);
      setData(apiData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInstution();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="md:text-4xl text-2xl font-bold mb-6 mt-10 text-center">
        Top Rated Individuals & Institutions
      </h1>

      {loading ? (
        <div className="flex items-center">
          {/* <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div> */}
          <p className="text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="relative flex justify-center items-center">
          <button
            ref={prevRef}
            className="absolute left-3 md:left-5 z-10 bg-black text-white rounded-full shadow-md hover:bg-primary"
          >
            <BiSolidLeftArrowAlt size={20} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-3 md:right-5 z-10 bg-black text-white rounded-full shadow-md hover:bg-primary"
          >
            <BiSolidRightArrowAlt size={20} />
          </button>

          <Swiper
            modules={[Navigation]}
            loop={true}
            spaceBetween={0}
            slidesPerView={2}
            slidesPerGroup={2}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="w-full max-w-sm mx-auto"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center md:w-36">
                  <Link
                    to={`/gh/detail/${item.category.name}/${item.id}`}
                      >
                    {/* ${slugify(item.category?.name)} */}
                    <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-200 rounded-full flex items-center justify-center shadow-md overflow-hidden cursor-pointer">
                      <img
                        src={profile01}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>  
                  </Link>

                  <p className="mt-5 text-center text-sm md:text-base">{item.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default TopRatedInstitutions;
