import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Connect from "./ConnectWallet";
import "./Header.css";
import { UserAddressContext } from "./../../UserAddressContext";

interface AddressProps {
  address: null | String;
}

const Header: React.FC<AddressProps> = (props) => {
  const context = useContext(UserAddressContext);
  let address = props.address ? props.address.slice(0, 6) : "";

  return (
    <header className="header">
      <nav className="nav-links">
        <div className="menu">
          <div className="logo">
            <img src="/images/logo.png" alt="logo" className="logo-img" />
            <Link to="/" className="logo-text">
              Liquifi
            </Link>
          </div>
          <Link className="menu-item" to="/about">
            About
          </Link>
          <Link className="menu-item" to="/contact-us">
            Contact
          </Link>
          <Link className="menu-item" to="/white-paper">
            White Paper
          </Link>
        </div>
        <div className="connection">
          <div className="connection-details">
            {address ? (
              <p>
                Connected as: <span>{address}</span>
              </p>
            ) : (
              <p>No MetaMask wallet connected</p>
            )}
          </div>
          <button
            className="refresh-button"
            onClick={context?.updateUserAddress}
          >
            Refresh Address
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
