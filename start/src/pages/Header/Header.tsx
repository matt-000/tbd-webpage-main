import React from 'react';
import {useContext, useState, useEffect} from 'react'
import Connect from './ConnectWallet';
import './Header.css';
import { UserAddressContext } from './../../UserAddressContext';

interface AddressProps {
	address: null | String;
}

// Our general header that holds all of links and info
const Header: React.FC<AddressProps> = (props) => {
  const context = useContext(UserAddressContext);
  return (
      <header className="header">
        <img 
          src="/images/metamask-fox.svg" 
          alt="Metamask reconnect" 
          onClick={context?.updateUserAddress} 
          className="metamask" 
        />
        <div className="logo">Liquifi</div>
        <nav className="navbar">
          <ul className="nav-links">
            <li className="nav-link">About</li>
            <li className="nav-link">Contact Us</li>
            <li className="nav-link">White Paper</li>
          </ul>
          <div className="cta">
            <Connect address={props.address}/>
          </div>
        </nav>
      </header>
  );
};

export default Header;
