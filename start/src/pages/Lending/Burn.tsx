import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import Header from './../Header/Header';
import Burny from './BurnyBaby';
import './../Borrowing/Borrowing.css';
import "./Lending.css"

const App = () => {
  let fetti_address =  '0x64648c7199658dB6D5fF1903b608fFfa015A81aa';
  let dai_address = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  let loaner_address = '0xb2534c942459C842EdC3b6B130ab2dE491ce5bf3';
  let vault_address = '0x201E0AF71f7b3D72208D94832339a7Fe01Be24e0';
  let gnsPool_address = '0xA1c88cf230A71031E853F63eab98EDeD7c42D344';

  const [errorMessage, setErrorMessage] = useState<null | String>(null);
	const [defaultAccount, setDefaultAccount] = useState<null | String>(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | number>(null);
	const [transferHash, setTransferHash] = useState(null);


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

	const iface = new ethers.Interface([
		"function maxWithdraw(address) view returns (uint256)",
		"function maxMint(address owner) returns (uint256)",
		"function previewMint(uint256 shares) view returns (uint256)",
		"function deposit(uint256, address) returns (uint256)",
		"function withdraw(uint256, address, address) returns (uint256)"
	  ]);
	

	useEffect(() => {
		updateBalance();
		updateTokenName();
	}, [])

	const updateBalance = async () => {
		let fettiProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(fettiProvider);

		let fettiSigner = await fettiProvider.getSigner();
		setSigner(fettiSigner);

		let fettiContract = new ethers.Contract(fetti_address, iface.fragments, fettiSigner);
		setContract(fettiContract);

		//let balanceBigN = await contract!.maxWithdraw(props.address);
		let balanceNumber = 0;

		let tokenBalance = Number(balanceNumber);

		setBalance(tokenBalance);
		console.log(tokenBalance);
	}

  const updateTokenName = async () => {
		setTokenName("FET");
	}

  return (
    <div className="app">
      <h2> {tokenName + " ERC-20 Wallet"} </h2>
		  <button className="button6" onClick={connectWalletHandler}>{connButtonText}</button>
      <Header address={defaultAccount}/>
      <LendingBorrowing />
      <MintBurn />
      <Burny user_address={defaultAccount} fetti_address={fetti_address} provider={provider} signer={signer} contract={contract} tokenName={tokenName} balance={balance}/>
    </div>
  );
};

export default App;