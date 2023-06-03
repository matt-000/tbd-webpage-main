import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import ConversionBox from './MintBox';
import CurrencySwap from './CurrencyMint';
import Header from './../Header/Header';
import Minty from './MintyBaby';
import "./Lending.css"

const App = () => {
  let fetti_address =  '0x3F827541482530549099782C6d53dB5Fa13c6435';
  let dai_address = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  let loaner_address = '0xBCe5F6d8e70C7B21C0C9d20E8B1074a1F24D7665';
  let vault_address = '0xE83b0AFec5377e454c1C0b173d71c4fD2DE94BD9';
  let gnsPool_address = '0x427c7D210FD4bc7d028c9c3CC6224875878faEaF';

  const [errorMessage, setErrorMessage] = useState<null | String>(null);
	const [defaultAccount, setDefaultAccount] = useState<null | String>(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | number>(null);
	const [transferHash, setTransferHash] = useState(null);

  const gnsIFace = new ethers.Interface([
    "function depositColateral(address, uint256) returns (uint256)",
    "function addColateral(uint256, uint256) returns (uint256)",
    "function repayLoan(uint256, uint256) returns (uint256)",
    "function widthdrawColateral(address, uint256) returns (uint256)"
  ]);

  console.log(gnsIFace.fragments);

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((result: string[]) => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch((error: Error) => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const accountChangedHandler = (newAddress: string) => {
		setDefaultAccount(newAddress);
	}

  return (
    <div className="app">
      <h2> {tokenName + " ERC-20 Wallet"} </h2>
		  <button className="button6" onClick={connectWalletHandler}>{connButtonText}</button>
      <Header address={defaultAccount}/>
      <LendingBorrowing />
      <MintBurn />
      <CurrencySwap />
      <Minty address={defaultAccount}/>
    </div>
  );
};

export default App;
