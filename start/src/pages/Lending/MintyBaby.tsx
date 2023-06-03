import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import CurrencyBurn from './CurrencyBurn';
import Header from './../Header/Header';
import "./Lending.css"
import Interactions from './Interactions';
import InteractionsBurn from './InteractionsBurn';
import './Wallet.module.css'
import FettiERC20 from './../../Artifacts/Contracts/FettiERC20.sol/FettiERC20.json'

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

  /*const FettiERC20 = [
    "function deposit() view returns (uint256) external override returns (uint256 shares)",
    "function mint(uint256 shares, address receive) external override returns (uint256 assets)",
    "function withdraw(uint256 assets, address receiver, address owner) external override returns (uint256 shares)",
	"function maxWithdraw(address owner) public view override returns (uint256 maxAssets)"
  ]*/

  const iface = new ethers.Interface([
	"function maxWithdraw(address owner) view returns (uint256)",
	"function maxMint(address owner) returns (uint256)",
	"function previewMint(uint256 shares) view returns (uint256)",
	"function mint(uint256, address) returns (uint256)"
  ]);

  console.log(iface.fragments);

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
		let tempProvider = new ethers.BrowserProvider(window.ethereum);

		let tempSigner = await tempProvider.getSigner();

		let tempContract = new ethers.Contract(fetti_address, iface.fragments, tempSigner)

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
		let balanceBigN = await contract!.maxWithdraw(defaultAccount);
		let balanceNumber = balanceBigN;

		let tokenBalance = Number(balanceNumber);

		setBalance(tokenBalance);
		console.log(tokenBalance);
	}

  const updateTokenName = async () => {
		setTokenName("FET");
	}
	

  return (
    <div>
		<h2> {tokenName + " ERC-20 Wallet"} </h2>
		<button className="button6" onClick={connectWalletHandler}>{connButtonText}</button>

		<div className = "walletCard">
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div>
				<h3>{tokenName} Balance: {balance}</h3>
			</div>
			{errorMessage}
			</div>

			<Interactions contract={contract} address={defaultAccount}/>
			<InteractionsBurn contract={contract} address={defaultAccount}/>
	</div>
  );
};

export default App;
