import React, { useEffect, useState } from "react";
import logo from "../../assets/HomeAssets/homelogo.png";
import { Link, NavLink } from "react-router-dom";
import whiteLogo from "../../assets/HomeAssets/homelogowhite.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import profilelogo from "../../assets/HomeAssets/profile-icon.png";
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user } = useContext(AuthContext);

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
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ${
        scrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-1">
        <NavLink to="/gh">
          <img
            src={scrolled ? whiteLogo : logo}
            alt="logo"
            className="cursor-pointer md:w-[6.3rem] w-20 pt-4"
          />
        </NavLink>

        {!user ? (
          <div className="flex space-x-4">
            <div className="inline-block p-[1px] bg-white rounded-lg">
              <Link to="/signup">
                <button className="btn-primary bg-primary text-white">
                  Sign Up
                </button>
              </Link>
            </div>
            <Link to="/login">
              <button className="btn-primary bg-white text-primary border border-primary">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="size-10 overflow-hidden rounded-full border-2 border-white cursor-pointer"
            >
              <img
                alt="User"
                className="size-full object-cover"
                src={profilelogo}
              />
            </div>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                <Link to="/">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                    Profile
                  </button>
                </Link>
                <button
                  className="w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  onClick={() => alert("Logout")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
