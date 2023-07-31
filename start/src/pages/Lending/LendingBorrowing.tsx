import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Lending.css";

// Just a holder to navigate through the page for borrowing vs lending
const LendingBorrowing = () => {
  const location = useLocation();

  return (
    <div className="lending-borrowing-container">
      <div className="lending-borrowing-buttons">
        <NavLink
          to="/"
          className={`box-item-lending ${
            location.pathname === "/" || location.pathname === "/burn"
              ? "active"
              : ""
          }`}
        >
          Lending
        </NavLink>
        <NavLink
          to="/borrowing"
          className={`box-item-lending ${
            location.pathname === "/borrowing" ? "active" : ""
          }`}
        >
          Borrowing
        </NavLink>
      </div>
    </div>
  );
};

export default LendingBorrowing;
