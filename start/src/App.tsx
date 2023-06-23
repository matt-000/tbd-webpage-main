import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAddressContext } from './UserAddressContext';
import "./App.css";
import BorrowPage from './pages/Borrowing/BorrowingPage';
import BorrowGNSFET from './pages/Borrowing/Borrowing';
import Lend from './pages/Lending/Lending';
import Burn from './pages/Lending/Burn';

type UserAddressContextType = {
  userAddress: String | null;
  updateUserAddress: () => void;
  fetti_address: string;
  dai_address: string;
  loaner_address: string;
  vault_address: string;
  gnsPool_address: string;
};

function App () {
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

  const [userAddress, setUserAddress] = useState<String | null>(null);
  const updateUserAddress = useCallback(async () => {
    await connectWalletHandler();
  }, []);

  const value: UserAddressContextType = {
    userAddress,
    updateUserAddress,
    fetti_address : '0x64648c7199658dB6D5fF1903b608fFfa015A81aa',
    dai_address : '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    loaner_address : '0xb2534c942459C842EdC3b6B130ab2dE491ce5bf3',
    vault_address :'0x201E0AF71f7b3D72208D94832339a7Fe01Be24e0',
    gnsPool_address : '0xA1c88cf230A71031E853F63eab98EDeD7c42D344'
  };

  return (
    <UserAddressContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Lend />} />
          <Route path="/Burn" element={<Burn />} />
          <Route path="/Borrowing" element={<BorrowPage />} />
          <Route path="/Borrowing/GNSFetti" element={<BorrowGNSFET />} />
        </Routes>
      </Router>
    </UserAddressContext.Provider>
  );
}

export default App;