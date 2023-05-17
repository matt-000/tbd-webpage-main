import React, { useEffect, useState } from "react";
import './Header.css';

const App: React.FC = () => {
const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
 const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
 
 useEffect(() => {
   if((window as any).ethereum){
     //check if Metamask wallet is installed
     setIsMetamaskInstalled(true);
   }
 },[]);

 
 
 //Does the User have an Ethereum wallet/account?
 async function connectMetamaskWallet(): Promise<void> {
   //to get around type checking
   (window as any).ethereum
     .request({
         method: "eth_requestAccounts",
     })
     .then((accounts : string[]) => {
       setEthereumAccount(accounts[0]);
     })
     .catch((error: any) => {
         alert(`Something went wrong: ${error}`);
     });
 }
 
 if (ethereumAccount === null) {
   return (
     <div className="header">
       {
         isMetamaskInstalled ? (
           <div>
             <div className="cta-image-container">
              <img className="cta-image" src="https://studybreaks.com/wp-content/uploads/2016/01/Fetty-Wap.png" alt="fet" />
              <button onClick={connectMetamaskWallet}>Connect Your Metamask Wallet</button>
            </div>
           </div>
         ) : (
           <p>Install Your Metamask wallet</p>
         )
       }
 
     </div>
   );
 }
 
 
 return (
   <div className="wallet-header">
      <div className="cta-image-container">
        <img className="cta-image" src="https://studybreaks.com/wp-content/uploads/2016/01/Fetty-Wap.png" alt="fet" />
        <p>
         ETH wallet connected as: {ethereumAccount}
       </p>
       </div>
   </div>
 );
}
 
export default App;