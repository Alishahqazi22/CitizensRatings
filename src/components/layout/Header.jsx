import React, { useEffect, useState } from "react";
import logo from "../../assets/HomeAssets/homelogo.png";
import { Link, NavLink } from "react-router-dom";
import whiteLogo from "../../assets/HomeAssets/homelogowhite.png";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1;
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <NavLink to="/gh">
          <img
            src={scrolled ? whiteLogo : logo}
            alt="logo"
            className="cursor-pointer md:w-[6.3rem] w-20"
          />
        </NavLink>

        <div className="flex space-x-4">
          <div className="inline-block p-[1px] bg-white rounded-lg">
            <Link to="/signup">
              <button className="btn-primary bg-primary border-double border-black border-2 text-white">
                Sign Up
              </button>
            </Link>
          </div>
          <button className="btn-primary bg-white text-primary border border-primary">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
