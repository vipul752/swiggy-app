import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  //btn which default value is "login"
  let [btn, setbtn] = useState("login");

  const online = useOnlineStatus();
  const bgColors = {
    backgroundColor: btn === "login" ? "#007bff" : "red",
  };

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul className="nav-icon">
          <li>Online Status: {online ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="relative flex items-center">
            <Link
              to="/cart"
              className="flex items-center text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span className="cart-icon mr-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19M7 13l-2 6h12l-2-6M7 13h10M10 17h4"
                  />
                </svg>
                {cartItems?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1 shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </span>
              <span>Cart</span>
              <span className="ml-2 text-gray-500">
                ({cartItems?.length || 0})
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
