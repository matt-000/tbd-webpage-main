import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core"
//import { injected } from "./connectors"
import './Header.css';
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds : [1,2,3,4]
})

const App: React.FC = () => {
const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
 const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
 /*const {active , account , library ,connector , activate , deactivate} = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', String(true))
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', String(false))
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', String(true))
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])*/

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
 );/*
 return (
  <div className="flex flex-col items-center justify-center">
    <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
    {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
    <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
  </div>
)*/
}
 
export default App;