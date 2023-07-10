import React, { useEffect, useState } from "react";
import './Header.css';

interface AddressProps {
	address: null | String;
}

// Simple component to hold information on our eth wallet
const App: React.FC<AddressProps> = (props) => {
 return (
   <div className="wallet-header">
      <div className="cta-image-container">
        <img src="/images/logo.png" alt="logo" />
        <p>
         ETH wallet connected as: {props.address}
       </p>
       </div>
   </div>
 );
}
 
export default App;