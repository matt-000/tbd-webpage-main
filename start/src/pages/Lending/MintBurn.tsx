import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Lending.css"

const Box = () => {
  const location = useLocation();

  return (
    <div className="box">
      <NavLink
        to="/"
        className={`box-item-mint ${location.pathname === '/' ? 'active' : ''}`}
      >
        Mint
      </NavLink>
      <NavLink
        to="/burn"
        className={`box-item-mint ${location.pathname === '/burn' ? 'active' : ''}`}
      >
        Burn
      </NavLink>
    </div>
  );
};

export default Box;