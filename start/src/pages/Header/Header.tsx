import React from 'react';
import Connect from './ConnectWallet';
import './Header.css';

interface AddressProps {
	address: null | String;
}

const Header: React.FC<AddressProps> = (props) => {
  return (
    <header className="header">
      <div className="logo">Liquifi</div>
      <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-link">About</li>
          <li className="nav-link">Contact Us</li>
          <li className="nav-link">White Paper</li>
        </ul>
        <div className="cta">
          <button className="cta-button">Sign Up</button>
          <button className="cta-button">Log In</button>
          <Connect address={props.address}/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
