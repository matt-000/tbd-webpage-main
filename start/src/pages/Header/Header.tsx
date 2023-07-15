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
  let result = props.address ? props.address.slice(0, 6) : "";
  return (
      <header className="header">
        <Link to="/">
          <div className="logo">Liquifi</div>
        </Link>
        <button
          className="refresh-button"
          onClick={context?.updateUserAddress}
        >
          {"Refresh Address"}
        </button>
        <nav className="navbar">
          <ul className="nav-links">
          <li className="nav-link"><Link to="/about">About</Link></li>
          <li className="nav-link"><Link to="/contact-us">Contact Us</Link></li>
          <li className="nav-link"><Link to="/white-paper">White Paper</Link></li>
          </ul>
          <div className="cta">
            <Connect address={result}/>
          </div>
        </nav>
      </header>
  );
};

export default Header;
