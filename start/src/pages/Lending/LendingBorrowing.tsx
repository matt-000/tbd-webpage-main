import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Lending.css"

// Just a holder to navigate through the page for borrowing vs lending
const Box = () => {
    const location = useLocation();
  
    return (
      <div className="box">
        <NavLink
          to="/"
          className={`box-item-lending ${location.pathname === '/' || location.pathname === '/burn' ? 'active' : ''}`}
        >
          Lending
        </NavLink>
        <NavLink
          to="/borrowing"
          className={`box-item-lending ${location.pathname === '/borrowing' ? 'active' : ''}`}
        >
          Borrowing
        </NavLink>
      </div>
    );
  };
  
  export default Box;