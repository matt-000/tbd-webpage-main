import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Lending.css";

// Just a holder to navigate through the page for borrowing vs lending
const LendingBorrowing = () => {
  const location = useLocation();

  return (
    <div className ="buttons-container">
      <div className="lending-borrowing-back">
        <NavLink
            to="/"
            className={`box-item-back`}
          >
            Back
        </NavLink>
      </div>
      <div className="lending-borrowing-container">
        <div className="lending-borrowing-buttons">
          <NavLink
            to="/Lend/LGNS"
            className={`box-item-lending ${
              location.pathname === "/Lend/LGNS" || location.pathname === "/burn/LGNS"
                ? "active"
                : ""
            }`}
          >
            Lending
          </NavLink>
          <NavLink
            to="/Borrow/LGNS"
            className={`box-item-lending ${
              location.pathname === "/Borrow/LGNS" ? "active" : ""
            }`}
          >
            Borrowing
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LendingBorrowing;
