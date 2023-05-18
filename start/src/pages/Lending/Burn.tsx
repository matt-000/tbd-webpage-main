import React from 'react';
import {useState, useEffect} from 'react'
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import CurrencyBurn from './CurrencyBurn';
import Header from './../Header/Header';
import {ethers} from 'ethers'
import ERC20_ABI from './../Contracts/ERC20_ABI'
import "./Lending.css"

const App = () => {
  let fetti_address =  '0x3F827541482530549099782C6d53dB5Fa13c6435';
  let loaner_address = '0xBCe5F6d8e70C7B21C0C9d20E8B1074a1F24D7665';
  let vault_address = '0xE83b0AFec5377e454c1C0b173d71c4fD2DE94BD9';
  let gnsPool_address = '0x427c7D210FD4bc7d028c9c3CC6224875878faEaF';

  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);;

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | number>(null);;
	const [transferHash, setTransferHash] = useState(null);

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const accountChangedHandler = (newAddress) => {
		setDefaultAccount(newAddress);
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.BrowserProvider(window.ethereum);

		let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(fetti_address, ERC20_ABI, tempSigner)

		setProvider(tempProvider);
		setSigner(tempSigner);
		setContract(tempContract);
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract])

	const updateBalance = async () => {
		let balanceBigN = await contract!.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let decimals = await contract!.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, decimals);

		setBalance(tokenBalance);
		console.log(tokenBalance);
	}

  const updateTokenName = async () => {
		setTokenName(await contract!.name());
	}
	

  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <MintBurn />
      <CurrencyBurn />
    </div>
  );
};

export default App;
