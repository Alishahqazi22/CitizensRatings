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
    <footer className="bg-primary text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-2 lg:col-span-1">
              <h2 className="font-bold text-xl sm:text-2xl mb-4">
                CitizensRatings.Com
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-100">
                We are a public platform built on the belief that citizens have
                the right to be heard — not just during elections, but every
                day. At CitizensRatings.com, we empower individuals to rate and
                review the entities that shape their lives, from heads of state
                and government agencies to local businesses, NGOs, and academic
                institutions.
              </p>
              <div className="flex flex-wrap gap-3">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3">
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  CitizensRatings
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <Link to="/gh"target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Home</p>
                    </li>
                  </Link>
                  <Link to="https://about.citizensratings.com" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>About us</p>
                    </li>
                  </Link>
                  <Link to="/gh/blogs" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Blog</p>
                    </li>
                  </Link>
                  <Link to="/gh/poll" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Polls</p>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">Legal</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <Link to="/gh/code-of-conduct" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Code Of Conduct</p>
                    </li>
                  </Link>
                  <Link to="/gh/site-guidelines" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Site Guidelines</p>
                    </li>
                  </Link>
                  <Link to="/gh/privacy-policy" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Privacy policy</p>
                    </li>
                  </Link>
                  <Link to="/gh/term-of-use" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Term of Use</p>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  Help & Support
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <Link to="/gh/faqs" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>FAQs</p>
                    </li>
                  </Link>
                  <Link to="/gh/contact-us" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Contact Us</p>
                    </li>
                  </Link>
                  <Link to="/gh/email-us" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>Email Us</p>
                    </li>
                  </Link>
                  <Link to="/gh/whatsapp-us" target="_blank">
                    <li className="flex items-center cursor-pointer transition-colors duration-200 group hover:text-gray-200 mb-3">
                      <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      <p>WhatsApp Us</p>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/30">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm sm:text-base lg:text-lg text-gray-200 font-medium">
              © 2025 Lispira. All rights reserved.{" "}
              <Link to="/" className="hover:underline">
                CitizensRatings.com
              </Link>{" "}
              and <Link to="/" className="hover:underline">GradeAndRate.com</Link> are products of Lispira
              Corporation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
