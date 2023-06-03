import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core"
//import { injected } from "./connectors"
import './Header.css';

interface AddressProps {
	address: null | String;
}
const App: React.FC<AddressProps> = (props) => {
 return (
   <div className="wallet-header">
      <div className="cta-image-container">
        <img className="cta-image" src="https://studybreaks.com/wp-content/uploads/2016/01/Fetty-Wap.png" alt="fet" />
        <p>
         ETH wallet connected as: {props.address}
       </p>
       </div>
   </div>
 );
}
 
export default App;