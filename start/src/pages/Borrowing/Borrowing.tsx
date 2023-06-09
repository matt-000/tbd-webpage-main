import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './Borrowing.css';
import LendingBorrowing from './../Lending/LendingBorrowing';
import BorrowingPage from './BorrowingPage';
import Header from './../Header/Header';
import InteractionsDepositCollateral from './InteractionsDepositCollateral';
import InteractionsAddCollateral from './InteractionsAddCollateral';
import InteractionsBorrow from './InteractionsBorrow';
import InteractionsRepayDebt from './InteractionsRepayDebt';
import InteractionsWithdraw from './InteractionsWithdraw';

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
    "function widthdrawColateral(address, uint256) returns (uint256)",
    "function borrow(uint256, uint256, address) returns(uint256)",
    "function balanceOf(address) returns(uint256)"
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
		updateEthers();
	}

	const updateEthers = async () => {
		let gnsProvider = new ethers.BrowserProvider(window.ethereum);

		let gnsSigner = await gnsProvider.getSigner();

		let gnsContract = new ethers.Contract(gnsPool_address, gnsIFace.fragments, gnsSigner)

		setProvider(gnsProvider);
		setSigner(gnsSigner);
		setContract(gnsContract);
	}

  return (
    <div className="app">
      <Header address={defaultAccount}/>
      <h2> {tokenName + " ERC-20 Wallet"} </h2>
		  <button className="button6" onClick={connectWalletHandler}>{connButtonText}</button>
      <LendingBorrowing />
      <InteractionsDepositCollateral contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
      <InteractionsBorrow contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
      <InteractionsAddCollateral contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
      <InteractionsRepayDebt contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
      <InteractionsWithdraw contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
    </div>
  );
};

export default App;
