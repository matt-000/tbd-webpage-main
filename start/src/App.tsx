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
  // Connecting to metamask 
  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((result: string[]) => {
				setUserAddress(result[0]);
			})
			.catch((error: Error) => {
				console.log(error.message);
			});

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