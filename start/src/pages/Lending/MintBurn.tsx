import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Lending.css";

// Just a holder to navigate through the page
const Box = () => {
  const location = useLocation();

  return (
    <div className="lending-borrowing-container mint-box">
      <div className="lending-borrowing-buttons">
        <NavLink
          to="/"
          className={`box-item-lending ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          Mint
        </NavLink>
        <NavLink
          to="/burn"
          className={`box-item-lending ${
            location.pathname === "/burn" ? "active" : ""
          }`}
        >
          Burn
        </NavLink>
      </div>
    </div>
  );
};

export default Box;
