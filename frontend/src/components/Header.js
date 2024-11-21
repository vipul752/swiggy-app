import { LOGO_URL } from "../utils/constant";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const online = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a reference for the dropdown

  useEffect(() => {
    const isLoggedStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (isLoggedStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md p-4 flex  items-center justify-between">
      <Toaster position="top-center" />

      <div className="logo-container">
        <img className="w-20" src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center space-x-10 font-semibold">
        <span className="text-gray-600">
          Online Status: {online ? "✅" : "🔴"}
        </span>
        <Link className="text-gray-600 hover:text-blue-500" to="/">
          Home
        </Link>
        <Link className="text-gray-600 hover:text-blue-500" to="/about">
          About
        </Link>
        <Link className="text-gray-600 hover:text-blue-500" to="/contact">
          Contact
        </Link>

        {isLoggedIn ? (
          <div className="relative inline-block">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="text-gray-700 font-medium hover:text-blue-500 focus:outline-none"
            >
              {username}
            </button>

            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-10"
              >
                <Link to="/profile">
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors duration-200"
                  >
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        )}

        <div className="relative flex items-center">
          <Link
            to="/cart"
            className="text-gray-600 hover:text-blue-500 relative flex items-center"
          >
            <FaShoppingCart className="text-2xl" />
            {cartItems?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 transform translate-x-1/2 -translate-y-1/2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
