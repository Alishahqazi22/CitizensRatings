import { useEffect, useState } from "react";
import logo from "../../assets/HomeAssets/homelogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import whiteLogo from "../../assets/HomeAssets/homelogowhite.png";
import profilelogo from "../../assets/HomeAssets/profile-icon.png";
function SecondHeader() {
  const accessToken = localStorage.getItem("accessToken");
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.06;
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
      className={`fixed top-0 left-0 w-full inset-10 z-[999999] transition-all duration-300 ${
        scrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-10 md:px-20 lg:px-44 py-2">
        <NavLink to="/gh">
          <img
            src={scrolled ? whiteLogo : logo}
            alt="logo"
            className="cursor-pointer md:w-[3.7rem] w-20 pt-4 z-50 inset-1"
          />
        </NavLink>

        {!accessToken ? (
          <div className="flex space-x-2 mt-3 mb-1">
            <div className="inline-block p-[1px] bg-white rounded">
              <Link to="/signup">
                <button className="btn-secondary border border-white bg-primary text-white">
                  Signup
                </button>
              </Link>
            </div>
            <Link to="/login">
              <button className="btn-secondary bg-white text-primary border border-primary">
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
                className="size-full object-cover z-50"
                src={user?.image || profilelogo}
              />
            </div>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                <Link to="/profile/user">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                    Profile
                  </button>
                </Link>
                <button
                  className="w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  onClick={handleLogout}
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

export default SecondHeader;
