import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAddressContext } from './UserAddressContext';
import "./App.css";
import BorrowPage from './pages/Borrowing/BorrowingPage';
import BorrowGNSFET from './pages/Borrowing/Borrowing';
import Lend from './pages/Lending/Lending';
import Burn from './pages/Lending/Burn';
import About from './pages/Misc/About';
import Contact from './pages/Misc/Contact';
import WhitePaper from './pages/Misc/WhitePaper';

// Creating the context variables
type UserAddressContextType = {
  userAddress: String | null;
  updateUserAddress: () => void;
  chainID: string | null;
  nftIDGNSPool: string | null;
  updateNFTIDGNSPool: (nft_id: string) => Promise<void>;
  fetti_address: string;
  dai_address: string;
  loaner_address: string;
  vault_address: string;
  gnsPool_address: string;
};

// We do most of our heavy lifting of this project in this app
function App () {
  // Chain ID
  const [chainID, setChainId] = useState<string | null>(null);

  // Used to make sure the chain is correct
  React.useEffect(() => {
    if (window.ethereum) {
      setChainId(window.ethereum.chainId); // Set the initial chainId

      window.ethereum.on('chainChanged', (newChainId: string) => {
        setChainId(newChainId);
      });
    }
  }, []);

  // Connecting to metamask 
  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts'});
        const networkId = await window.ethereum.request({ method: 'net_version' });
  
        if (networkId !== "137") {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }], // 0x89 is the hexadecimal equivalent of 137
            });
          } catch (switchError) {
            console.error(switchError);
          }
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Need to install MetaMask');
      console.log('Please install MetaMask browser extension to interact');
    }
  }  

  // State variables for the users
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const updateUserAddress = useCallback(async () => {
    await connectWalletHandler();
  }, []);

  // State variables for the NFT
  const [nftIDGNSPool, setNFTIDGNSPool] = useState<string | null>(null);
  const updateNFTIDGNSPool = useCallback(async (nft_id: string) => {
    await setNFTIDGNSPool(nft_id);
  }, []);

  // Initializing the values in our project
  const value: UserAddressContextType = {
    userAddress,
    updateUserAddress,
    chainID,
    nftIDGNSPool,
    updateNFTIDGNSPool,
    fetti_address : '0x64648c7199658dB6D5fF1903b608fFfa015A81aa',
    dai_address : '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    loaner_address : '0xb2534c942459C842EdC3b6B130ab2dE491ce5bf3',
    vault_address :'0x201E0AF71f7b3D72208D94832339a7Fe01Be24e0',
    gnsPool_address : '0xA1c88cf230A71031E853F63eab98EDeD7c42D344'
  };

  // Rendering routes in our project
  return (
    <UserAddressContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Lend />} />
          <Route path="/Burn" element={<Burn />} />
          <Route path="/Borrowing" element={<BorrowPage />} />
          <Route path="/Borrowing/GNSFetti" element={<BorrowGNSFET />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/white-paper" element={<WhitePaper />} />
        </Routes>
      </Router>
    </UserAddressContext.Provider>
  );
}

export default App;