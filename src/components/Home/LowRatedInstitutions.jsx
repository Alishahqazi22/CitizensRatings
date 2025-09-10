import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi";
import profile01 from "../../assets/HomeAssets/Public-Opinion-2.jpg";
import profile02 from "../../assets/HomeAssets/Celebrity-1.jpg";

function LowRatedInstitutions() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="flex flex-col mt-5">
      <h1 className="md:text-4xl text-2xl font-bold mb-6 mt-10 text-center">
        Low Rated Individuals & Institutions
      </h1>

      <div className="relative flex justify-center items-center">
        {/* Custom Buttons */}
        <button
          ref={prevRef}
          className="absolute left-5 z-10 bg-black text-white rounded-full shadow-md hover:bg-primary"
        >
          <BiSolidLeftArrowAlt size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-5 z-10 bg-black text-white rounded-full shadow-md hover:bg-primary"
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
          <SwiperSlide>
            <div className="flex flex-col items-center w-36">
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src={profile01}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <p className="mt-5 text-center">Kate Mawusi Babanawo</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center w-36">
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src={profile02}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="mt-5 text-center">Bollar Biggie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center w-36">
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src={profile01}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="mt-5 text-center">Kate Mawusi Babanawo</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center w-36">
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src={profile02}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="mt-5 text-center">Kate Mawusi Babanawo</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default LowRatedInstitutions;
