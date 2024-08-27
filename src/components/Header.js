import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  //btn which default value is "login"
  let [btn, setbtn] = useState("login");

  const online = useOnlineStatus();
  const bgColors = {
    backgroundColor: btn === "login" ? "#007bff" : "red",
  };

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
          <li>
            <Link to="/">Cart</Link>
          </li>
          <button
            className="btn-header"
            style={bgColors}
            onClick={() => {
              btn === "login" ? setbtn("logout") : setbtn("login");
            }}
          >
            {btn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
