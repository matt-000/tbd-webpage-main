import React from 'react';
import {useContext} from 'react'
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <div className="logo">Liquifi</div>
        </Link>
        <nav className="navbar">
          <ul className="nav-links">
          <li className="nav-link"><Link to="/about">About</Link></li>
          <li className="nav-link"><Link to="/contact-us">Contact Us</Link></li>
          <li className="nav-link"><Link to="/white-paper">White Paper</Link></li>
          </ul>
          <div className="cta">
            <Connect address={props.address!.slice(0, 6)}/>
          </div>
        </nav>
      </header>
  );
};

export default Header;
