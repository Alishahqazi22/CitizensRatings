import React from "react";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-primary w-full flex text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto"></div>
      <div className="w-full lg:w-[26%] pr-[3.4rem] flex flex-col justify-start">
        <h1 className="text-xl md:text-2xl font-bold">CitizensRatings.Com</h1>
        <p className="my-4">
          We are a public platform built on the belief that citizens have the
          right to be heard — not just during elections, but every day. At
          CitizensRatings.com, we empower individuals to rate and review the
          entities that shape their lives, from heads of state and government
          agencies to local businesses, NGOs, and academic institutions.
        </p>
        <div className="flex gap-3">
          <span className="p-2 rounded-full bg-[#1AA3D1]">
            <FaFacebook className="w-5 h-5" />
          </span>
          <span className="p-1 rounded-full bg-[#1AA3D1]">
            <FaLinkedin className="w-6 h-6" />
          </span>
          <span className="p-2 rounded-full bg-[#1AA3D1]">
            <FaTwitter className="w-5 h-5" />
          </span>
          <span className="p-2 rounded-full bg-[#1AA3D1]">
            <FaGoogle className="w-5 h-5" />
          </span>
          <span className="p-2 rounded-full bg-[#1AA3D1]">
            <FaPinterest className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-36 justify-start">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            CitizensRatings.Com
          </h1>
          <ul>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Home</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>About Us</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Blog</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Polls</p>
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            Legal
          </h1>
          <ul className="space-y-3">
           <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Code Of Conduct</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Site Guidelines</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Privacy Policy</p>
              </li>
            </Link>
            <Link to="/">
              <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                <p>Terms of Use</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
